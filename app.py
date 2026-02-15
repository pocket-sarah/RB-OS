from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn

app = FastAPI(title="Python Backend API")

# CORS middleware to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Python Backend API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/data")
async def get_data():
    return {
        "data": "Sample data from Python backend",
        "items": [
            {"id": 1, "name": "Item 1"},
            {"id": 2, "name": "Item 2"},
            {"id": 3, "name": "Item 3"}
        ]
    }

@app.post("/api/submit")
async def submit_data(data: dict):
    return {
        "success": True,
        "received": data,
        "message": "Data processed successfully"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
