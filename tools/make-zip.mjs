/**
 * Minimális, szabványos ZIP-készítő (külső csomag nélkül).
 *
 * Miért saját: a Windows `Compress-Archive` visszaperjelet ír az útvonalakba,
 * a `tar -a` pedig itt tar-t készít zip helyett. Mindkettő megzavarhatja a
 * Cloudflare kicsomagolóját. Ez a változat mindig `/` elválasztót használ,
 * és a mappa TARTALMÁT teszi az archívum gyökerébe.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, posix } from "node:path";
import { deflateRawSync } from "node:zlib";

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

/** Rekurzívan összegyűjti a fájlokat, az archívumon belüli (posix) névvel. */
function collect(dir, prefix = "") {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const abs = join(dir, entry);
    const name = prefix ? posix.join(prefix, entry) : entry;
    if (statSync(abs).isDirectory()) out.push(...collect(abs, name));
    else out.push({ abs, name });
  }
  return out;
}

export function makeZip(sourceDir, zipPath) {
  const files = collect(sourceDir);
  const locals = [];
  const central = [];
  let offset = 0;

  for (const file of files) {
    const data = readFileSync(file.abs);
    const crc = crc32(data);
    const deflated = deflateRawSync(data, { level: 9 });
    // Ha a tömörítés nem nyer semmit (pl. WebP), tároljuk tömörítetlenül.
    const useDeflate = deflated.length < data.length;
    const body = useDeflate ? deflated : data;
    const method = useDeflate ? 8 : 0;
    const nameBuf = Buffer.from(file.name, "utf8");

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // szükséges verzió
    local.writeUInt16LE(0x0800, 6); // UTF-8 névjelző
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(0, 10); // idő
    local.writeUInt16LE(0x21, 12); // dátum (1996-01-01, állandó → reprodukálható)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, body);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(method, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0x21, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(body.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt32LE(offset, 42);
    central.push(cd, nameBuf);

    offset += local.length + nameBuf.length + body.length;
  }

  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);

  writeFileSync(zipPath, Buffer.concat([...locals, centralBuf, end]));
  return files.length;
}
