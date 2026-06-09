import { addUserMessage, chat } from "../helpers.js";

// The system prompt steers *how* Claude responds.
// Here we force clean, concise, code-only output (no prose, no markdown fences).
const SYSTEM_PROMPT = `You are a senior software engineer who writes clean, concise, idiomatic code.

Rules:
- Output ONLY the function. No explanations, no commentary, no markdown code fences.
- Keep it as short and readable as possible while remaining correct.
- Use clear names and the most direct approach available in the language.
- Include a one-line docstring/comment only if it genuinely aids clarity.`;

const messages = [];
addUserMessage(
  messages,
  "Write a JavaScript function that checks whether a string contains any duplicate characters."
);

const answer = await chat(messages, { system: SYSTEM_PROMPT });
console.log(answer);
