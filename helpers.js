import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

// Load the shared root .env (relative to this file, not the cwd).
config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

// Sonnet 4.6 still supports the `temperature` parameter that this course uses.
// (Opus 4.8/4.7 removed temperature/top_p/top_k and will 400 if sent.)
const DEFAULT_MODEL = "claude-sonnet-4-6";

export function addUserMessage(messages, text) {
  messages.push({ role: "user", content: text });
  return messages;
}

export function addAssistantMessage(messages, text) {
  messages.push({ role: "assistant", content: text });
  return messages;
}

export async function chat(
  messages,
  { system, temperature = 1.0, model = DEFAULT_MODEL, maxTokens = 1000 } = {}
) {
  const params = {
    model,
    max_tokens: maxTokens,
    messages,
    temperature,
  };
  if (system) {
    params.system = system;
  }

  const message = await client.messages.create(params);
  return message.content[0].text;
}
