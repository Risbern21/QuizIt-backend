import OpenAI from "openai";
import { Request, Response, NextFunction } from "express";
import { dummy } from "../dummyresponse";

export const generate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topic: string = req.body["topic"];
    const numQuestions: number = req.body["numQuestions"]
      ? Number(req.body["numQuestions"])
      : 5;
    const difficulty: string = req.body["difficulty"]
      ? req.body["difficulty"]
      : "easy";

    if (topic === "" || topic.trim() === "") {
      res.status(400).json({ message: "topic must be mentioned" });
    }

    // res.status(200).json(dummy);

    const client = new OpenAI({
      apiKey: `${process.env.API_KEY}`,
      baseURL: "https://api.chatanywhere.org/v1",
      defaultHeaders: {
        "User-Agent": "QuizAppBackend/1.0", // add this
      },
    });

    const chatCompletion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `You are a quiz generator. Generate ${numQuestions} multiple-choice questions with 4 options and clearly mention the correct answers index.It should be of ${difficulty} difficulty.`,
        },
        {
          role: "user",
          content: `Generate a quiz on the topic: ${topic}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "return_quiz",
            description:
              "returns a quiz object with questions and their answers",
            parameters: {
              type: "object",
              properties: {
                questions: {
                  type: "array",
                  minItems: numQuestions,
                  items: {
                    type: "object",
                    properties: {
                      question: { type: "string" },
                      options: {
                        type: "array",
                        items: { type: "string" },
                      },
                      correct: {
                        type: "number",
                      },
                    },
                    required: ["question", "options", "correct"],
                  },
                },
              },
              required: ["questions"],
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "return_quiz" } },
    });

    if (chatCompletion.choices[0].message.tool_calls?.[0].function.arguments) {
      const raw = JSON.parse(
        chatCompletion.choices[0].message.tool_calls[0].function.arguments
      );

      res.status(200).json(raw);
    } else {
      res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
