import json
import httpx
from typing import Optional
from backend.app.config import settings
from backend.app.utils.logger import logger


class OpenRouterClient:
    """Thin async wrapper around OpenRouter's OpenAI-compatible API."""

    BASE_URL = "https://openrouter.ai/api/v1"

    def __init__(self):
        self.api_key = settings.openrouter_api_key
        self.model = settings.openrouter_model
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://contentcurator.ai",
            "X-Title": "Content Curator",
        }

    async def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int = 2048,
        temperature: float = 0.7,
    ) -> str:
        """Send a chat completion request and return the response text."""
        payload = {
            "model": self.model,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "response_format" : {
                "type": "json_object"
            }
        }

        logger.debug(f"Calling OpenRouter model={self.model}")

        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.BASE_URL}/chat/completions",
                headers=self.headers,
                json=payload,
            )

        if response.status_code != 200:
            logger.error(f"OpenRouter error {response.status_code}: {response.text}")
            raise RuntimeError(
                f"LLM API error {response.status_code}: {response.text[:200]}"
            )

        data = response.json()
        #print("This is the raw data",data)
        content = data["choices"][0]["message"]["content"]
        print("==========JSON DATA===============")
        print(content)
        print("==========JSON DATA ENDS===============")
        if content is None:
            raise ValueError("LLM returned empty response")
        logger.debug(f"LLM response length: {len(content)} chars")
        return content

    async def chat_json(
        self,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int = 6000,
        temperature: float = 0.5,
    ) -> dict:
        raw = await self.chat(system_prompt, user_prompt, max_tokens, temperature)
        # Strip ```json ... ``` fences
        cleaned = raw.strip()
        if cleaned.startswith("```"):
            lines = cleaned.splitlines()
            cleaned = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError as e:
            #print("RAW LLM RESPONSE:")
            #print(cleaned)
            logger.error(f"Failed to parse LLM JSON: {e}\nRaw: {raw[:500]}")
            raise ValueError(f"LLM returned invalid JSON: {e}") from e


# Singleton
llm_client = OpenRouterClient()
