import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(
  process.env.GEMINIKEY ? process.env.GEMINIKEY : ""
);
export const getResponseAi = async (prompt: string, img?: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.1 },
  });
  try {
    let results;
    if (img) {
      const image = {
        inlineData: {
          data: img,
          mimeType: "image/png",
        },
      };
      results = await model.generateContent([prompt, image]);
      return results.response.text();
    }
    results = await model.generateContentStream([prompt]);
    let text = "";
    for await (const chunk of results.stream) {
      const chunkText = chunk.text();
      text += chunkText;
    }
    text = text.replace(/\n\*/g, "'");
    text = text.replace(/\n/g, "'");
    text = text.replace(/\*\*/g, "'");
    text = text.replace(/\''/g, "'");
    text = text.replace(/\'/g, "'");
    return text;
  } catch (error) {
    console.log("error", error);
  }
};
