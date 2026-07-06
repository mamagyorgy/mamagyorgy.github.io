from PIL import Image
import os

for archivo in os.listdir():
    if archivo.lower().endswith(('.webp', '.jpeg', '.webp')):
        nombre = os.path.splitext(archivo)[0]
        img = Image.open(archivo)
        img.save(f"{nombre}.webp", "WEBP", quality=85)
        print(f"Convertido: {archivo}")