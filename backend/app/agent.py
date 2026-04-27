from langchain.tools import tool
from langgraph.graph import StateGraph

# ------------------ TOOLS ------------------

@tool
def log_interaction(data: str):
    """Log interaction details with HCP"""
    return f"Interaction logged: {data}"

@tool
def edit_interaction(data: str):
    """Edit existing interaction"""
    return f"Interaction updated: {data}"

@tool
def summarize_interaction(data: str):
    """Summarize interaction notes"""
    return f"Summary: {data[:50]}..."

@tool
def suggest_next_action(data: str):
    """Suggest next best action for sales rep"""
    return "Suggested: Schedule follow-up meeting"

@tool
def fetch_history(data: str):
    """Fetch past interaction history"""
    return "Past interactions fetched"

# ------------------ AGENT NODE ------------------

def agent_node(state):
    user_input = state["input"].lower()

    # smarter intent detection
    if "summary" in user_input:
        return {"output": summarize_interaction.invoke(user_input)}

    elif "suggest" in user_input or "next" in user_input:
        return {"output": suggest_next_action.invoke(user_input)}

    elif "history" in user_input:
        return {"output": fetch_history.invoke(user_input)}

    elif "edit" in user_input or "update" in user_input:
        return {"output": edit_interaction.invoke(user_input)}

    else:
        return {"output": log_interaction.invoke(user_input)}

# ------------------ GRAPH ------------------

builder = StateGraph(dict)

builder.add_node("agent", agent_node)

builder.set_entry_point("agent")

graph = builder.compile()