FROM python:3.10-slim

# Reduce image size by installing only essentials
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY embedding-server/requirements.txt requirements.txt

# Use pip without cache to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

COPY embedding-server .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]



