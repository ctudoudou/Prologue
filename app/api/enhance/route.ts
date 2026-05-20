import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const body = await req.json();
    const { text, fieldType } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let prompt = "";
    if (fieldType === "summary") {
      prompt = `Rewrite and enhance the following professional summary for a resume. Make it impactful, concise, and professional. 
Do not add any preamble or conversational text. Output ONLY the improved summary:\n\n${text}`;
    } else if (fieldType === "experience") {
      prompt = `Rewrite and enhance the following job experience description for a resume. Use strong action verbs and make it result-oriented (e.g., using XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"). Keep it concise and professional. Use bullet points if appropriate (dash -).
Do not add any preamble or conversational text. Output ONLY the improved description:\n\n${text}`;
    } else {
      prompt = `Enhance the following text for a professional resume. Make it impactful and concise.
Do not add any preamble or conversational text. Output ONLY the improved text:\n\n${text}`;
    }

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
