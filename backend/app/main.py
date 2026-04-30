from fastapi import FastAPI
from pydantic import BaseModel
import os

from fastapi.middleware.cors import CORSMiddleware

# 👉 GROQ
from groq import Groq

# =====================
# APP SETUP
# =====================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================
# REQUEST MODEL
# =====================
class ChatRequest(BaseModel):
    message: str

# =====================
# GROQ CLIENT
# =====================
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")  # set in Render
)

# =====================
# HOME ROUTE
# =====================
@app.get("/")
def home():
    return {"message": "Backend working"}

# =====================
# TOOL DETECTION LOGIC
# =====================
def detect_tool(message):
    msg = message.lower()

    if "update" in msg or "edit" in msg:
        return "edit_interaction"
    elif "history" in msg or "previous" in msg:
        return "get_history"
    elif "material" in msg or "suggest" in msg:
        return "search_material"
    elif "next step" in msg or "follow up" in msg:
        return "follow_up"
    else:
        return "log_interaction"

# =====================
# LLM RESPONSE FUNCTION
# =====================
def generate_llm_response(prompt):
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an AI assistant for pharma CRM."},
            {"role": "user", "content": prompt},
        ],
        model="llama3-8b-8192",
    )

    return chat_completion.choices[0].message.content

# =====================
# CHAT ROUTE
# =====================
@app.post("/chat")
def chat(req: ChatRequest):
    user_input = req.message

    tool = detect_tool(user_input)

    # TOOL: LOG INTERACTION
    if tool == "log_interaction":
        prompt = f"""
        Extract structured data from this interaction:
        {user_input}

        Return:
        - HCP Name
        - Product
        - Sentiment
        - Follow-up action
        """
        result = generate_llm_response(prompt)

        return {
            "tool": "Log Interaction",
            "response": result
        }

    # TOOL: EDIT INTERACTION
    elif tool == "edit_interaction":
        prompt = f"""
        Update the following interaction based on instruction:
        {user_input}
        """
        result = generate_llm_response(prompt)

        return {
            "tool": "Edit Interaction",
            "response": result
        }

    # TOOL: GET HISTORY
    elif tool == "get_history":
        return {
            "tool": "Get Interaction History",
            "response": "Showing past interactions with the requested HCP."
        }

    # TOOL: SEARCH MATERIAL
    elif tool == "search_material":
        return {
            "tool": "Search Materials",
            "response": "Recommended materials: Diabetes brochure, dosage guide, product leaflet."
        }

    # TOOL: FOLLOW-UP
    elif tool == "follow_up":
        prompt = f"""
        Suggest next best action based on this interaction:
        {user_input}
        """
        result = generate_llm_response(prompt)

        return {
            "tool": "Follow-up Recommendation",
            "response": result
        }

    # DEFAULT
    return {
        "response": "Could not process request"
    }