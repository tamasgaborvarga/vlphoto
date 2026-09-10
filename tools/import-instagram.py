# -*- coding: utf-8 -*-
"""
Az Instagramról letöltött képek importálása (fotok-nyers-ig/).

  py tools/import-instagram.py

A fájlnév `<kategoria>-iNNN.webp` lesz — az `i` jelzi az Instagram-forrást,
az NNN pedig a forrás sorszáma, így stabil marad a hivatkozás.

Két méret készül, mint a Facebook-anyagnál:
  public/galeria/<kat>-iNNN.webp        rács,     max  900 px, q80
  public/galeria/nagy/<kat>-iNNN.webp   nagyítás, max 1600 px, q86
"""
import os
from PIL import Image, ImageOps

SRC = "fotok-nyers-ig"
OUT = os.path.join("public", "galeria")
OUT_FULL = os.path.join(OUT, "nagy")

# Válogatás. Szempont: technikai minőség, kompozíció, és hogy a képek
# SZÍNVILÁGBAN ne üssenek el egymástól — a visszafogott, meleg-semleges
# vonal a vezető (vászon háttér, natúr fények, fekete-fehér-krém ruhák).
PORTRE = [4, 5, 8, 9, 10, 11, 12, 13, 15, 35, 36, 37, 59, 61, 63, 64, 65,
          67, 69, 70, 71, 72, 74, 76, 89, 95, 97, 98, 143, 155]

PAROS = [41, 42, 43, 44, 45, 46, 48, 49, 50, 52, 54, 55, 57, 58, 78, 79,
         82, 85, 86, 87, 100, 103, 105, 106, 107, 109, 116, 118, 139, 141]

KREATIV = [2, 122, 124, 128, 129, 130, 131, 132, 133, 134, 135, 136]

SZEZONALIS = [21, 22, 26, 27, 28, 29, 31, 34]


def kategoria(n):
    if n in SZEZONALIS: return "szezonalis"
    if n in PAROS: return "paros"
    if n in KREATIV: return "kreativ"
    if n in PORTRE: return "portre"
    return None


os.makedirs(OUT_FULL, exist_ok=True)

szamlalo = {}
grid_meret = 0
full_meret = 0
db = 0

for fajl in sorted(os.listdir(SRC)):
    if not fajl.lower().endswith(".jpg"):
        continue
    n = int(fajl[3:6])
    kat = kategoria(n)
    if kat is None:
        continue

    szamlalo[kat] = szamlalo.get(kat, 0) + 1
    nev = "%s-i%03d.webp" % (kat, n)

    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, fajl))).convert("RGB")

    nagy = im.copy()
    nagy.thumbnail((1600, 1600), Image.LANCZOS)
    nagy.save(os.path.join(OUT_FULL, nev), "WEBP", quality=86, method=6)

    im.thumbnail((900, 900), Image.LANCZOS)
    im.save(os.path.join(OUT, nev), "WEBP", quality=80, method=6)

    grid_meret += os.path.getsize(os.path.join(OUT, nev))
    full_meret += os.path.getsize(os.path.join(OUT_FULL, nev))
    db += 1

print("Instagram-képek beimportálva: %d" % db)
for k in ("portre", "paros", "kreativ", "szezonalis"):
    if k in szamlalo:
        print("  %-11s %d" % (k, szamlalo[k]))
print("Rács:     %.1f MB" % (grid_meret / 1024 / 1024))
print("Nagyítás: %.1f MB" % (full_meret / 1024 / 1024))
