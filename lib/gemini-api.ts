const GEMINI_API_KEY = "AIzaSyCKT828tC1dYPb0ZNQzFHwRX0VqoKzOcnI"
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export type GeminiResponse = {
  text: string
  error?: string
}

export async function generateContent(prompt: string): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to generate content")
    }

    const data = await response.json()

    // Extract the text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    return { text }
  } catch (error) {
    console.error("Error generating content:", error)
    return {
      text: "",
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function generateQuiz(topic: string, difficulty: "beginner" | "intermediate" | "advanced"): Promise<any> {
  const prompt = `
    Create a quiz about ${topic} at a ${difficulty} level. 
    The quiz should be tailored for students in Northern Nigeria learning about blockchain.
    Format the response as a JSON object with the following structure:
    {
      "questions": [
        {
          "question": "The question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0, // Index of the correct answer
          "explanation": "Explanation of why this is the correct answer"
        }
      ]
    }
    Include 5 questions. Make sure the content is culturally relevant to Northern Nigeria.
  `

  try {
    const { text, error } = await generateContent(prompt)

    if (error) {
      throw new Error(error)
    }

    // Extract the JSON from the response
    const jsonMatch =
      text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/({[\s\S]*})/)

    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1])
    } else {
      try {
        // Try to parse the entire text as JSON
        return JSON.parse(text)
      } catch (e) {
        throw new Error("Failed to parse quiz data")
      }
    }
  } catch (error) {
    console.error("Error generating quiz:", error)
    // Return a fallback quiz
    return {
      questions: [
        {
          question: "What is blockchain?",
          options: [
            "A type of cryptocurrency",
            "A distributed ledger technology",
            "A programming language",
            "A cloud storage service",
          ],
          correctAnswer: 1,
          explanation:
            "Blockchain is a distributed ledger technology that maintains a continuously growing list of records called blocks.",
        },
      ],
    }
  }
}

export async function generateExplanation(concept: string): Promise<string> {
  const prompt = `
    Explain the blockchain concept of "${concept}" in simple terms that would be understandable to someone in Northern Nigeria who is new to technology.
    Use analogies relevant to local culture and daily life in Northern Nigeria.
    Keep the explanation under 300 words and make it accessible to someone with limited technical background.
  `

  try {
    const { text, error } = await generateContent(prompt)

    if (error) {
      throw new Error(error)
    }

    return text
  } catch (error) {
    console.error("Error generating explanation:", error)
    return `We couldn't generate an explanation for "${concept}" at this time. Please try again later or check your internet connection.`
  }
}

export async function generateLocalUseCase(industry: string): Promise<string> {
  const prompt = `
    Generate a practical use case for how blockchain technology could be applied in the ${industry} sector in Northern Nigeria.
    Consider local challenges, cultural context, and infrastructure limitations.
    Explain how this blockchain application would work, its benefits, and potential implementation challenges.
    Keep the explanation under 400 words and make it practical and relevant to the region.
  `

  try {
    const { text, error } = await generateContent(prompt)

    if (error) {
      throw new Error(error)
    }

    return text
  } catch (error) {
    console.error("Error generating use case:", error)
    return `We couldn't generate a use case for "${industry}" at this time. Please try again later or check your internet connection.`
  }
}

export async function translateContent(content: string, targetLanguage: "english" | "hausa"): Promise<string> {
  const prompt = `
    Translate the following content to ${targetLanguage}. 
    If the content is already in ${targetLanguage}, simply return it unchanged.
    Maintain the original meaning and technical accuracy while making it natural in the target language.
    
    Content to translate:
    ${content}
  `

  try {
    const { text, error } = await generateContent(prompt)

    if (error) {
      throw new Error(error)
    }

    return text
  } catch (error) {
    console.error("Error translating content:", error)
    return content // Return original content if translation fails
  }
}

export async function generateImage(prompt: string): Promise<string | null> {
  // Placeholder implementation - replace with actual image generation logic
  // This function should call an image generation API (e.g., DALL-E, Stable Diffusion)
  // and return the URL of the generated image.
  // For now, it returns a placeholder image URL.
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return "/placeholder.svg"
}

