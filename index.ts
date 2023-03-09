import { App } from "@slack/bolt";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export const askGpt = async (userPrompt: string): Promise<string>=> {
  const completion = await openai.createCompletion({
      model:"text-davinci-003",
      temperature: 0.6,
      frequency_penalty: 1.5,
      presence_penalty: 1.2,
      max_tokens: 4000,
      prompt: userPrompt,
      });
      return completion.data.choices[0].text ? completion.data.choices[0].text: 'cannot get response from openai, sorry!';
  }

const SLACK_APP_TOKEN = "xapp-1-A04SE77B6BA-4860034378023-1392ee4c09d82c45e59cc1896702e0800c0eb2e4a0ded0e1ea0a281c6681f5cc";
const SLACK_BOT_TOKEN = "xoxb-4870015825026-4898256031904-7V3IH7k98r8Nx2CW2btsPkHQ";

const app = new App({
  appToken: SLACK_APP_TOKEN,
  token: SLACK_BOT_TOKEN,
  socketMode: true,
});

app.command("/gpt", async ({ ack, command, say }) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(command.text);
  await ack();
  const odp: string = await askGpt(command.text);
  console.log(odp);
  say(odp);
  }
);

app.start(999).catch((error) => {
  console.error(error);
  process.exit(1);
});