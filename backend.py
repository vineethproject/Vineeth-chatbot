from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama2",
                "prompt": req.message,
                "stream": False
            },
            timeout=60
        )
        data = response.json()
        content = data.get("response", None)
        if not content:
            return {"response": "[DEBUG] Ollama responded but content was empty. Try a longer or different prompt."}
        return {"response": content.strip()}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}

@app.get("/")
def root():
    return {"message": "Chatbot API is running (Ollama)."}
