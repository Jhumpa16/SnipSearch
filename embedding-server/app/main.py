from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import uvicorn

app = FastAPI()

# ✅ Add this block immediately after creating the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # This allows requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Your embedding model and endpoint logic
model = SentenceTransformer("all-MiniLM-L6-v2")

class EmbeddingRequest(BaseModel):
    text: str

@app.post("/embedding")
async def generate_embedding(request: EmbeddingRequest):
    embedding = model.encode(request.text).tolist()
    print("🔍 Length of embedding:", len(embedding))  # 👈 Add this line
    return {"embedding": embedding}

# Optional if you want to run directly via Python (instead of uvicorn CLI)
if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)