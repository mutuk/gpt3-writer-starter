import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Give me 3 agenda items for a 1:1 with my direct report. I want to discuss regarding engagement. 
The questions have to be conversational, insightful, deep, and detailed.
Agenda items:
`
// const generateAction = async (req, res) => {
//   // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-002',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.7,
//     max_tokens: 250,
//   });
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}`,
      temperature: 0.8,
      max_tokens: 400,
    });
    const basePromptOutput = baseCompletion.data.choices.pop();
    console.log(basePromptOutput);
    res.status(200).json({ output:  basePromptOutput});
    // I build Prompt #2.
    const secondPrompt = 
    `
    From the summary and generate a twitter thread. Don't just list the points. Go deep into each one.

    Summary: ${basePromptOutput.text}

    Twitter thread:
    `;
  
//   const basePromptOutput = baseCompletion.data.choices.pop();

//   res.status(200).json({ output: basePromptOutput });
// };
    // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1000,
  });
  
  // Get the output
  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  // res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;