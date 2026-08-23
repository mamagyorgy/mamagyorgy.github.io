from PIL import Image
import os

for archivo in os.listdir():
    if archivo.lower().endswith((".png", ".jpg", ".jpeg")):
        nombre = os.path.splitext(archivo)[0]

        with Image.open(archivo) as img:
            img.save(f"{nombre}.webp", "WEBP", quality=85)

        print(f"Convertido: {archivo} → {nombre}.webp")
