import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { NextResponse } from "next/server";
import { env } from "@/env";
import { auth } from "@clerk/nextjs";


// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);



// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  

  
  const data = await req.json();

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
          "Convert inputted text to as many detailed terms/questions and defintions/answers as you can without being too repetitive. If it appears as though the definition is incorrect, not detailed enough, or not put the correct way, fix it. For example, if a math formula is given as a term ex. (the change of base formula )give the actual formula as the definition (ex. log_a(b) = log_c(b) / log_c(a)) not just a description of that formula. If a given term doesn't have a definition don't return it",
        parameters: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description:
                "inputted text to as many detailed terms/questions and defintions/answers as you can without being too repetitive. If it appears as though the definition is incorrect, not detailed enough, or not put the correct way, fix it. For example, if a math formula is given as a term ex. (the change of base formula )give the actual formula as the definition (ex. log_a(b) = log_c(b) / log_c(a)) not just a description of that formula. If a given term doesn't have a definition don't return it",
            },
          },
          required: ["text"],
        },
      },
    ],
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

const text = `la playa beach`