import { NextRequest, NextResponse } from "next/server";
import { generateAiText, validateAiConfig } from "@/lib/ai-provider";
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

    const aiConfig = validateAiConfig(
      typeof body === "object" && body !== null && "aiConfig" in body
        ? body.aiConfig
        : undefined
    );
    if (!aiConfig.ok) {
      return NextResponse.json(
        { error: aiConfig.error },
        { status: aiConfig.status }
      );
    }

    const prompt = buildEnhancePrompt(validation.text, validation.fieldType);
    const response = await generateAiText(aiConfig.config, [
      {
        role: "system",
        content: "You are a precise resume editor. Return only the requested resume text.",
      },
      { role: "user", content: prompt },
    ]);

    if (!response.ok) {
      return NextResponse.json({ error: response.error }, { status: 502 });
    }

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("Error enhancing text:", error);
    return NextResponse.json({ error: "Failed to enhance text" }, { status: 500 });
  }
}
