FROM python:3.10-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY embedding-server/requirements.txt requirements.txt

# Install CPU-only PyTorch to avoid bloat
RUN pip install --no-cache-dir torch==2.1.2+cpu torchvision==0.16.2+cpu torchaudio==2.1.2+cpu -f https://download.pytorch.org/whl/torch_stable.html

# Then install the rest
RUN pip install --no-cache-dir -r requirements.txt

COPY embedding-server .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]



