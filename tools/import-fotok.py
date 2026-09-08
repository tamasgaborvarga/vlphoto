# -*- coding: utf-8 -*-
"""
A fotok-nyers/ mappából elkészíti a weboldal galériáját.

  py tools/import-fotok.py

Két méretet gyárt minden képből:
  public/galeria/<kat>-NNN.webp        RÁCS     max  900 px, WebP q80
  public/galeria/nagy/<kat>-NNN.webp   NAGYÍTÁS max 1600 px, WebP q86

A rácsban a kis változat jelenik meg (gyors betöltés), kattintásra a nagy.
Így a látható minőség jó marad, de az oldal nem lassul be.

A kategóriát a lenti listák adják; ami nincs felsorolva, az portré lesz.
"""
import os, shutil
from PIL import Image, ImageOps

SRC = "fotok-nyers"
OUT = os.path.join("public", "galeria")
OUT_FULL = os.path.join(OUT, "nagy")

# Nem fotók: logó és reklámgrafika
KIHAGY = {34, 40, 132, 137, 138, 168}

# Jelmezes / szürreális sorozat — a user kérésére kimarad (171: maszkos-rojtos,
# 173: gombaszobor). Nem illik a többi kép vizuális nyelvéhez.
JELMEZES = {169, 170, 171, 172, 173, 174}

# VÁLOGATÁS — csak ezek kerülnek a weboldalra.
# Szempontok: egy sorozatból max 2-3 kép, kollázs (több fotó egy fájlban) ki,
# változatos helyszín és fény, minden kategória képviselve.
# Ha üresre állítod (KIVALASZTOTT = None), minden kép bekerül.
KIVALASZTOTT = {
    3, 5, 8, 13, 16, 18, 21, 23, 27, 29,
    30, 36, 42, 43, 46, 54, 59, 62, 63, 66,
    71, 77, 80, 81, 84, 86, 91, 92, 99, 104,
    106, 108, 113, 117, 118, 123, 124, 125, 128, 131,
    136, 139, 141, 142, 146, 150, 155, 158, 159, 164,
    171, 173, 175, 178, 179, 183, 190, 192, 195, 198,
    200, 204, 207, 209, 211, 213, 216, 219, 222, 228,
    231, 235, 240, 242, 243, 245, 253, 255, 256,
}

SZEZONALIS = [1, 2, 43, 120, 121, 122, 123, 124, 125, 126,
              139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
              151, 152, 153, 154, 155, 156, 157]

PAROS = [3, 4, 5, 18, 19, 20, 21, 22, 23, 24,
         77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
         106, 107, 108, 109, 110, 111, 112, 113,
         127, 128, 129, 130, 131, 158, 175, 176, 177, 179,
         202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214,
         215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227,
         228, 229, 230, 250, 253, 254, 255, 256, 257]

KREATIV = [10, 11, 12, 13, 14, 15, 16, 17,
           60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
           96, 97, 98, 99, 100, 101, 102, 103, 105, 117, 118, 119,
           133, 134, 172, 173, 174, 178, 180, 194, 195, 196, 197]

def kategoria(n):
    if n in SZEZONALIS: return "szezonalis"
    if n in PAROS: return "paros"
    if n in KREATIV: return "kreativ"
    return "portre"

if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT_FULL, exist_ok=True)

szamlalo = {}
osszes_grid = 0
osszes_full = 0
db = 0

for fajl in sorted(os.listdir(SRC)):
    if not fajl.lower().endswith(".jpg"):
        continue
    n = int(fajl[3:6])
    if n in KIHAGY or n in JELMEZES:
        continue
    if KIVALASZTOTT is not None and n not in KIVALASZTOTT:
        continue
    kat = kategoria(n)
    # A fájlnév a FORRÁS sorszámát viszi tovább — így egy kép kivétele nem
    # rendezi át a többit, és a hivatkozások (kiemelt, collections) stabilak.
    szamlalo[kat] = szamlalo.get(kat, 0) + 1
    nev = "%s-%03d.webp" % (kat, n)

    im = Image.open(os.path.join(SRC, fajl))
    im = ImageOps.exif_transpose(im).convert("RGB")

    nagy = im.copy()
    nagy.thumbnail((1600, 1600), Image.LANCZOS)
    nagy.save(os.path.join(OUT_FULL, nev), "WEBP", quality=86, method=6)

    im.thumbnail((900, 900), Image.LANCZOS)
    im.save(os.path.join(OUT, nev), "WEBP", quality=80, method=6)

    osszes_grid += os.path.getsize(os.path.join(OUT, nev))
    osszes_full += os.path.getsize(os.path.join(OUT_FULL, nev))
    db += 1

print("Beimportálva: %d kép" % db)
for k in ("portre", "paros", "szezonalis", "kreativ"):
    if k in szamlalo:
        print("  %-11s %d" % (k, szamlalo[k]))
print("Kihagyva (nem fotó): %d" % len(KIHAGY))
print("Rács:     %.1f MB" % (osszes_grid / 1024 / 1024))
print("Nagyítás: %.1f MB" % (osszes_full / 1024 / 1024))
print("Együtt:   %.1f MB" % ((osszes_grid + osszes_full) / 1024 / 1024))
