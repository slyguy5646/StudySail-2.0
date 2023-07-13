// // import { NextResponse } from "next/server";
// // import z from "zod";


// // export async function POST(req: Request) {
// //   const schema = z.object({
// //     text: z.string(),
// //   });

// //   const validation = schema.safeParse(await req.json());
// //   let headersList = {
// //     Accept: "*/*",
// //     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
// //     Authorization: "Bearer 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",
// //     "Content-Type": "application/json",
// //   };

// //   let bodyContent = JSON.stringify({
// //     model: "gpt-4-0613",
// // messages: [
// //   {
// //     role: "user",
// //     content:
// //       " 2/24/23, 12:28 PM Algebra II07.03 Lesson SummaryTo achieve mastery of this lesson, make sure that you develop responses to the essential questionslisted below.How are exponential functions related to logarithmic functions?How can a logarithmic function be created?How can the properties of exponents help solve logarithmic equations?Change of Base FormulaThe Change of Base Formula is used to evaluate logarithmic expressions whose base is not equalto 10. You will see the application of this formula when graphing logarithmic functions. To use theformula, the common log of the argument is divided by the common log of the base.Change of Base Formulalog y =bEquality PropertyGiven an equation where two logarithmic expressions with identical bases are equal to each other,the arguments of those expressions are also equal.If log x = log y, then x = y.4 4Product PropertyWhen two or more logarithmic expressions with the same base are added, the arguments may bemultiplied.log 3 + log 57 7log (3)(5)7log 157Quotient PropertyWhen two or more logarithmic expressions with the same base are subtracted, the arguments maybe divided.log 54 − log 97 7log7log 67https://lss.agilixbuzz.com/student/180632632/activity/24938_resource 1/22/24/23, 12:28 PM Algebra IIPower PropertyA coefficient on a logarithmic term can be moved to the exponent of its argument and an exponentcan become a coefficient.4 log 374log 37 log 817Logarithmic Equations with ConstantsTo solve a logarithmic equation using constants, isolate the constant terms on one side of theequation. Isolate the logarithmic terms on the other side. Then, convert the logarithmic equation intoan exponential equation.log x = 3737 = x343 = xPrinthttps://lss.agilixbuzz.com/student/180632632/activity/24938_resource 2/2",
// //   },
// //   {
// //     role: "assistant",
// //     content: "",
// //     function_call: {
// //       name: "get_terms_and_definitions",
// //       arguments:
// //         '{ "text":" 2/24/23, 12:28 PM Algebra II07.03 Lesson SummaryTo achieve mastery of this lesson, make sure that you develop responses to the essential questionslisted below.How are exponential functions related to logarithmic functions?How can a logarithmic function be created?How can the properties of exponents help solve logarithmic equations?Change of Base FormulaThe Change of Base Formula is used to evaluate logarithmic expressions whose base is not equalto 10. You will see the application of this formula when graphing logarithmic functions. To use theformula, the common log of the argument is divided by the common log of the base.Change of Base Formulalog y =bEquality PropertyGiven an equation where two logarithmic expressions with identical bases are equal to each other,the arguments of those expressions are also equal.If log x = log y, then x = y.4 4Product PropertyWhen two or more logarithmic expressions with the same base are added, the arguments may bemultiplied.log 3 + log 57 7log (3)(5)7log 157Quotient PropertyWhen two or more logarithmic expressions with the same base are subtracted, the arguments maybe divided.log 54 − log 97 7log7log 67https://lss.agilixbuzz.com/student/180632632/activity/24938_resource 1/22/24/23, 12:28 PM Algebra IIPower PropertyA coefficient on a logarithmic term can be moved to the exponent of its argument and an exponentcan become a coefficient.4 log 374log 37 log 817Logarithmic Equations with ConstantsTo solve a logarithmic equation using constants, isolate the constant terms on one side of theequation. Isolate the logarithmic terms on the other side. Then, convert the logarithmic equation intoan exponential equation.log x = 3737 = x343 = xPrinthttps://lss.agilixbuzz.com/student/180632632/activity/24938_resource 2/2"}',
// //     },
// //   },
// // ],
// //     functions: [
// //       {
// //         name: "get_terms_and_definitions",
// //         description: "convert inputted text to terms and defintions",
// //         parameters: {
// //           type: "object",
// //           properties: {
// //             text: {
// //               type: "string",
// //               description: "The text to convert to terms and defintions",
// //             },
// //           },
// //           required: ["text"],
// //         },
// //       },
// //     ],
// //   });

// //   let response = await fetch("https://api.openai.com/v1/chat/completions", {
// //     method: "POST",
// //     body: bodyContent,
// //     headers: headersList,
// //   });

// //   let data = await response.text();
// //   console.log(data);

// //   if (!response.ok) return NextResponse.json({ error: response.status });

// //   return NextResponse.json(await response.json());
// // }

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import z from "zod";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const data = await req.json();

  // console.log(data);
  // const schema = z.object({
  //   text: z.string(),
  // });
  // const validation = schema.safeParse(data);
  // if (!validation.success) return new NextResponse();

  // console.log(validation.data.text);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    stream: true,
    model: "gpt-4-0613",
    messages: [
      {
        role: "user",
        content: data.text,
      },
      {
        role: "assistant",
        content: "",
        function_call: {
          name: "get_terms_and_definitions",
          arguments: `{ "text": ${data.text}}`,
        },
      },
    ],

    functions: [
      {
        name: "get_terms_and_definitions",
        description: "convert inputted text to terms and defintions if a given term doesn't have a definition don't return it",
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
// import { Configuration, OpenAIApi } from "openai-edge";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// // Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

// export async function POST(req: Request) {
//   // Extract the `messages` from the body of the request
//   const { messages } = await req.json();

//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     stream: true,
//     messages: [...messages],
//     functions: [
//       {
//         name: "get_terms_and_definitions",
//         description: "convert inputted text to terms and defintions",
//         parameters: {
//           type: "object",
//           properties: {
//             text: {
//               type: "string",
//               description: "The text to convert to terms and defintions",
//             },
//           },
//           required: ["text"],
//         },
//       },
//     ],
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }


const text = `el aeropuerto airport
el vuelo flight
el pasaporte passport
el avión plane
la maleta suitcase
el boleto ticket
el equipaje luggage
el recuerdo
souvenir (as well as
"memory")
En la playa
At the Beach
el traje de baño swimsuit
el océano ocean
la isla island
la ola wave
la arena sand
la piscina pool
la puesta del sol sunset
el bloqueador sunscreen
Set 3
nadar to swim
bucear to dive
hacer surf to surf
el lago lake
la toalla towel
la sombrilla umbrella
la concha shell
sacar fotos to take pictures
Set 4
viajar to travel
ir de vacaciones to go on vacation
salir to depart or leave
disfrutar to enjoy
estar de viaje to be on a trip
encontrar to find`