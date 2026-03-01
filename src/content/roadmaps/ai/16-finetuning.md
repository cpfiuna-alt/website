---
id: "16"
title: "Fine-tuning"
description: "Ajustar modelos pre-entrenados para tareas específicas."
---

# Fine-tuning

Adaptar modelos pre-entrenados a tus datos y tareas.

## Tipos de fine-tuning

| Tipo | Descripción |
|------|-------------|
| Full fine-tuning | Actualizar todos los pesos |
| Feature extraction | Congelar backbone, entrenar cabeza |
| LoRA/QLoRA | Actualizar matrices de bajo rango |

## Fine-tuning con Hugging Face

```python
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from transformers import Trainer, TrainingArguments

# Cargar modelo
model_name = "bert-base-uncased"
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=2
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Tokenizar dataset
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Configurar entrenamiento
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
)

trainer.train()
```

## LoRA (Low-Rank Adaptation)

Fine-tuning eficiente con menos memoria.

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1,
)

model = get_peft_model(model, config)
model.print_trainable_parameters()
# Solo entrena ~0.1% de parámetros
```

## Fine-tuning de LLMs

```python
# Con Hugging Face TRL
from trl import SFTTrainer

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=512,
)

trainer.train()
```

## Cuándo usar cada técnica

| Situación | Recomendación |
|-----------|---------------|
| Pocos datos | Feature extraction |
| Datos moderados | LoRA |
| Muchos datos | Full fine-tuning |
| GPU limitada | QLoRA |
