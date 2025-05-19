// openaiController.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCalendar = async (req, res) => {
  const { niche, frequency } = req.body;

  if (!niche || !frequency) {
    return res.status(400).json({ error: "Niche and frequency are required" });
  }

  const prompt = `Create a 30-day content calendar for a ${niche} creator posting ${frequency}. Format it in bullet points with dates.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    res.status(200).json({ success: true, content: responseText });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
};
