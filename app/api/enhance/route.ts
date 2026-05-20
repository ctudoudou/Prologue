import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { buildEnhancePrompt, validateEnhanceRequest } from "@/lib/enhance";

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateEnhanceRequest(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = buildEnhancePrompt(validation.text, validation.fieldType);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("Error enhancing text:", error);
    return NextResponse.json({ error: "Failed to enhance text" }, { status: 500 });
  }
}
