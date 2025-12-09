---
id: "14"
title: "IA Generativa"
description: "Modelos que generan contenido nuevo: texto, imágenes, audio."
---

# IA Generativa

Modelos que crean contenido nuevo y original.

## Tipos de contenido generado

| Tipo | Modelos |
|------|---------|
| Texto | GPT-4, Claude, LLaMA |
| Imágenes | DALL-E 3, Midjourney, Stable Diffusion |
| Audio | Whisper, ElevenLabs |
| Video | Sora, Runway |
| Código | GitHub Copilot, Claude |

## Generación de imágenes

### Stable Diffusion

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

prompt = "A beautiful sunset over mountains, digital art"
image = pipe(prompt).images[0]
image.save("generated.png")
```

### DALL-E con API

```python
from openai import OpenAI

client = OpenAI()

response = client.images.generate(
    model="dall-e-3",
    prompt="Un gato astronauta en el espacio",
    size="1024x1024",
    quality="standard",
    n=1
)

image_url = response.data[0].url
```

## Audio

### Text to Speech

```python
from openai import OpenAI

client = OpenAI()

response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input="Hola, soy una IA generando audio."
)

response.stream_to_file("audio.mp3")
```

### Speech to Text (Whisper)

```python
audio_file = open("audio.mp3", "rb")
transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file
)
print(transcript.text)
```

## Modelos Generativos

- **GANs**: Generator vs Discriminator
- **VAEs**: Variational Autoencoders
- **Diffusion Models**: Añaden y quitan ruido
- **Transformers**: Autoregresivos (GPT) o Masked (BERT)

## Aplicaciones

- Arte y diseño
- Marketing (contenido)
- Educación (tutores)
- Programación (asistentes)
- Entretenimiento (juegos, películas)
