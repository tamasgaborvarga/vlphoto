import { openSync, readSync, closeSync, statSync } from "node:fs";

/** JPEG / PNG / WebP képméret kiolvasása külső csomag nélkül. */
export function imageSize(file) {
  const size = statSync(file).size;
  const fd = openSync(file, "r");
  try {
    const head = Buffer.alloc(Math.min(size, 64 * 1024));
    readSync(fd, head, 0, head.length, 0);

    // PNG: IHDR a 16. bájttól
    if (head.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
      return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
    }

    // WebP
    if (head.slice(0, 4).toString("ascii") === "RIFF" && head.slice(8, 12).toString("ascii") === "WEBP") {
      const type = head.slice(12, 16).toString("ascii");
      if (type === "VP8X") return { width: (head.readUIntLE(24, 3) & 0xffffff) + 1, height: (head.readUIntLE(27, 3) & 0xffffff) + 1 };
      if (type === "VP8 ") return { width: head.readUInt16LE(26) & 0x3fff, height: head.readUInt16LE(28) & 0x3fff };
      if (type === "VP8L") {
        const b = head.readUInt32LE(21);
        return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
      }
    }

    // JPEG: végigolvassuk a szegmenseket az SOF markerig
    if (head[0] === 0xff && head[1] === 0xd8) {
      const buf = Buffer.alloc(size);
      readSync(fd, buf, 0, size, 0);
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        // SOF0..SOF15, a DHT/DAC/RST kivételével
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } finally {
    closeSync(fd);
  }
  throw new Error(`Nem sikerült kiolvasni a méretet: ${file}`);
}
