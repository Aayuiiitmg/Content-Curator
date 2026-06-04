#this is the point of contact betweent my project and my llm api
#right now we are using open router if in future we change to some other llm we can change
#just this file 

from openai import OpenAI, RateLimitError, APITimeoutError
from app.config import settings

client = OpenAI(
    api_key=settings.OPERNROUTER_API_KEY,
    base_url=settings.OPENROUTER_BASE_URL
)

def call_llm(prompt: str) -> str:
    try:
        response=client.chat.completions.create(
            model=settings.OPENROUTER_MODEL,
            max_tokens=settings.LLM_MAX_OUTPUT_TOKENS,
            temperature=settings.LLM_TEMPERATURE,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        return response.choices[0].message.content
    
    except RateLimitError:
        raise Exception("LLM rate limit hit — try again in a moment")
    
    except APITimeoutError:
        raise Exception("LLM request timed out — try again")
    
    except Exception as e:
        raise Exception(f"LLM call failed: {str(e)}")