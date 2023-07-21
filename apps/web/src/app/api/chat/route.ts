import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { NextResponse } from "next/server";
import { env } from "@/env";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("I GOT HIT");
  const schema = z.object({
    text: z.string(),
  });
  const validation = schema.safeParse(data);
  if (!validation.success) return new NextResponse();

  // console.log(validation.data.text);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    stream: true,
    model: "gpt-4-0613",
    messages: [
      {
        role: "user",
        content: validation.data.text,
      },
      {
        role: "assistant",
        content: "",
        function_call: {
          name: "get_terms_and_definitions",
          arguments: `{ "text": ${validation.data.text}}`,
        },
      },
    ],

    functions: [
      {
        name: "get_terms_and_definitions",
        description:
          "convert inputted text to as many terms/questions and defintions/answers as you can without being repetitive. If a given term and definition pair seems to trivial, exclude it. If it appears as though the definition is incorrect, correct it. if a given term doesn't have a definition don't return it",
        parameters: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to convert to terms and defintions",
            },
          },
          required: ["text"],
        },
      },
    ],
  });
  console.log(response);
  // // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}


