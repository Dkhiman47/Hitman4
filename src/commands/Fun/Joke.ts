import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import axios from "axios";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "joke",
      description: "sends a random joke for you.",
      category: "fun",
      usage: `${client.config.prefix}joke`,
      baseXp: 30,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    await axios
      .get(`https://v2.jokeapi.dev/joke/Any`)
      .then((response) => {
        // console.log(response);
        const text = `š *Category:* ${response.data.category}\nš *Joke:* ${response.data.setup}\nšļø *Delivery:* ${response.data.delivery}`;
        M.reply(text);
      })
      .catch((err) => {
        M.reply(`An error occurred.`);
      });
  };
}
