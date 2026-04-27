from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from app.agent import graph   # ✅ LangGraph import

app = FastAPI()

# ✅ CORS (important for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ (Optional) Groq client if needed later
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
# ✅ Test route
@app.get("/")
def home():
    return {"message": "Backend working"}

# ✅ Chat route using LangGraph
@app.post("/chat")
def chat(data: dict):
    msg = data["message"]

    # 🔥 LangGraph execution
    result = graph.invoke({"input": msg})

    return {"reply": result["output"]}