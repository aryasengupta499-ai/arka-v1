import os
from fastapi import FastAPI, Header, HTTPException, Request
from postgrest import SyncPostgrestClient
from dotenv import load_dotenv

# Load the secret keys from the .env file
load_dotenv()

app = FastAPI()

# Connect using the lighter Postgrest client
url: str = f"{os.environ.get('SUPABASE_URL')}/rest/v1"
key: str = os.environ.get("SUPABASE_SERVICE_KEY")
supabase = SyncPostgrestClient(url, headers={"apikey": key, "Authorization": f"Bearer {key}"})

@app.post("/v1/chat/completions")
async def chat_completions(request: Request, authorization: str = Header(None)):
    # 1. Intercept & Authenticate
    if not authorization or not authorization.startswith("Bearer arka_"):
        raise HTTPException(status_code=401, detail="Missing or invalid ARKA API key")
    
    api_key = authorization.split(" ")[1]

    # 2. Database Check: Find the Project ID
    key_response = supabase.from_("api_keys").select("project_id").eq("key_string", api_key).execute()
    
    if not key_response.data:
        raise HTTPException(status_code=401, detail="Unauthorized: Key not found in ARKA database.")
    
    project_id = key_response.data[0]["project_id"]

    # 3. Budget Guardrails
    project_response = supabase.from_("projects").select("monthly_budget, current_spend").eq("id", project_id).execute()
    project = project_response.data[0]
    
    if project["current_spend"] >= project["monthly_budget"]:
        raise HTTPException(status_code=429, detail="ARKA Guardrail: Project monthly budget exceeded.")

    # 4. Mock Routing Response
    body = await request.json()
    requested_model = body.get("model", "gpt-4")
    
    return {
        "id": "arka-intercepted-msg-1",
        "object": "chat.completion",
        "model": f"arka-routed-{requested_model}",
        "choices": [{
            "message": {
                "role": "assistant",
                "content": f"ARKA Interceptor Active. Budget healthy (${project['current_spend']} / ${project['monthly_budget']})."
            }
        }]
    }