/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "rules",
      description: "shows the rules for beyond",
      category: "general",
      usage: `${client.config.prefix}rules`,
      baseXp: 0,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const buttons = [
      {
        buttonId: "rules",
        buttonText: { displayText: `${this.client.config.prefix}rules` },
        type: 1,
      },
    ];

    const buttonMessage: any = {
      contentText: `\n\n_*πHELLO THERE  hitman47 BOT IS HEREπ*_\n\n_*ββββ°β¬ββ°ββπ βπ°ππππππ πππππβ πβββΎβ΅β«β―ββββ*_\n\nββββ\n\nβΈ Don't neither ask for the Bot Script or to be the Mod/Owner it's illegalπ«\n\nβΈ Use &support to get the Official group link in your DM\n\nβΈ If you want to chat with Star you can use *&chat (your text)* both are different AI Chat Bots\n\nβΈ If you want to add Star Chan in your group the contact the owner by *&owner/&mods* \n\nβΈ Dont use wrong command, use the command given in the *help list* \n\nβΈ Dont spam the bot with commands if the bot is not responding, its means the bot maybe offline or facing Internet issues. \n\nβΈ Dont DM the Bot \n\nβΈ If You Don't follow the Rules You will be Banned π« soon.\n\n`,


      footerText: "hitman47π",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
