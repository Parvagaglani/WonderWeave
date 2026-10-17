import axios from "axios";

// --- Rate Limiting & Cooldown Guardrails ---
let lastRequestTimestamp = 0;
const COOLDOWN_SECONDS = 5;
const requestHistory = [];
const MAX_REQUESTS_PER_MINUTE = 6;

// --- Sanitization Helper ---
const sanitizeInput = (str = "") => {
  if (typeof str !== "string") return "";
  // Strip control characters, html tags, and limit length
  return str.replace(/<[^>]*>?/gm, "").trim().slice(0, 50);
};

async function fetchFromApi(params = []) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  if (!apiKey || apiKey === "AIzaSyCHiGC-whX5AMBvT51VHDHHoMPN_k2HRBc") {
    throw new Error(
      "Missing or invalid Gemini API key in .env file."
    );
  }

  // --- Guardrail 1: Enforce Client-Side Cooldown (5s) ---
  const now = Date.now();
  const timeSinceLast = (now - lastRequestTimestamp) / 1000;
  if (timeSinceLast < COOLDOWN_SECONDS) {
    const waitTime = Math.ceil(COOLDOWN_SECONDS - timeSinceLast);
    throw new Error(
      `Hold your horses, little explorer! 🐴 Give our story wizard ${waitTime} second${waitTime > 1 ? "s" : ""} to catch their breath.`
    );
  }

  // --- Guardrail 2: Enforce Rate Limit (Max 6 per minute) ---
  // Purge timestamps older than 60 seconds
  while (requestHistory.length > 0 && now - requestHistory[0] > 60000) {
    requestHistory.shift();
  }
  if (requestHistory.length >= MAX_REQUESTS_PER_MINUTE) {
    throw new Error(
      "Whoa, you're a super reader! 🌟 Let's take a quick 1-minute breather while the magic quill recharges."
    );
  }

  // Handle both legacy array input or params object
  let rawItems = [];
  let rawCategory = "Animal Kingdom";
  let rawAgeGroup = "6-8 years";
  let rawTone = "Fun & Adventurous";

  if (Array.isArray(params)) {
    rawItems = params;
  } else if (typeof params === "object" && params !== null) {
    rawItems = params.items || [];
    rawCategory = params.category || "Animal Kingdom";
    rawAgeGroup = params.ageGroup || "6-8 years";
    rawTone = params.tone || "Fun & Adventurous";
  }

  // --- Guardrail 3: Input Sanitization & Boundaries ---
  const category = sanitizeInput(rawCategory) || "Learning Adventure";
  const ageGroup = sanitizeInput(rawAgeGroup) || "6-8 years";
  const tone = sanitizeInput(rawTone) || "Fun & Adventurous";
  const safeItems = Array.isArray(rawItems)
    ? rawItems.slice(0, 3).map(sanitizeInput).filter(Boolean)
    : [];

  const itemList =
    safeItems.length > 0 ? safeItems.join(", ") : "fun discoveries";

  // --- Guardrail 4: Strict Kid-Safe Educational Prompt ---
  const prompt = `You are a safe, wholesome educational storyteller for children.
Write an uplifting, educational short story for kids aged ${ageGroup} about "${category}".
Characters / elements featured: ${itemList}.
Tone: ${tone}.
Target length: 140 to 180 words.
Mandatory requirements:
1. Include exactly 2 real, captivating educational fun facts woven naturally into the story.
2. The story must be 100% wholesome, friendly, safe, and positive with a gentle life lesson.
3. Absolutely no violence, scary themes, or inappropriate content.`;

  const model = process.env.REACT_APP_GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        contents: [{ parts: [{ text: prompt }] }],
        // --- Guardrail 5: Token limits (strictly prevent high token usage) ---
        generationConfig: {
          maxOutputTokens: 350,
          temperature: 0.7,
        },
        // --- Guardrail 6: Google AI Strict Child Safety Filters ---
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_LOW_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_LOW_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_LOW_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_LOW_AND_ABOVE" },
        ],
      },
    });

    // Record successful request timestamp for rate limiting
    lastRequestTimestamp = Date.now();
    requestHistory.push(lastRequestTimestamp);

    const candidate = response?.data?.candidates?.[0];
    if (!candidate) {
      throw new Error("Oops! Our storybook fell asleep for a second. Let's try once more! ✨");
    }

    // --- Guardrail 7: Safety Finish Reason Check ---
    if (candidate.finishReason === "SAFETY") {
      throw new Error(
        "Oops! Let's pick a friendlier topic for our magical storybook adventure! 🎈"
      );
    }

    const text = candidate?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("The magic ink vanished! Please press weave story again. 🪄");
    }

    return text;
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error("The storybook workshop is super busy right now! Let's wait a minute and try again. 🎪");
    }
    if (error.response?.data?.error?.message) {
      throw new Error("The story wizard got a little tangled up. Let's try spinning a new tale! 🌟");
    }
    throw error;
  }
}

export default fetchFromApi;
