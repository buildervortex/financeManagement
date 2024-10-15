import Groq from 'groq-sdk';
import c from "config";

const fetchSuggestionsFromGroq = async (prompt: string): Promise<{ message: string }> => {
  const groq = new Groq({
    apiKey: c.get("grogApiKey"),
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.2-3b-preview',
    });

    return { message: chatCompletion.choices[0]?.message?.content || 'No suggestion available' };
  } catch (error) {
    return { message:'Error occurred while fetching suggestions'};
  }
};

export default fetchSuggestionsFromGroq;