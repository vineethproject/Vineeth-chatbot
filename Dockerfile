# See https://docs.docker.com/engine/reference/builder/
FROM python:3.11-slim

WORKDIR /app

COPY backend.py ./
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
