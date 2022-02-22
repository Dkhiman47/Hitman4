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
      contentText: `\n\n_*🎊HELLO THERE  ANGELA BOT IS HERE🎊*_\n\n_*─☞☛✰✬★✰──🎀 ⌊𝙰𝚗𝚐𝚎𝚕𝚊🚀 𝚁𝚞𝚕𝚎𝚜⌉ 🎀──✾✵✫✯☚☜──*_\n\n☟☟☟☟\n\n➸ Don't neither ask for the Bot Script or to be the Mod/Owner it's illegal🚫\n\n➸ Use &support to get the Official group link in your DM\n\n➸ If you want to chat with Star you can use *&chat (your text)* both are different AI Chat Bots\n\n➸ If you want to add Star Chan in your group the contact the owner by *&owner/&mods* \n\n➸ Dont use wrong command, use the command given in the *help list* \n\n➸ Dont spam the bot with commands if the bot is not responding, its means the bot maybe offline or facing Internet issues. \n\n➸ Dont DM the Bot \n\n➸ If You Don't follow the Rules You will be Banned 🚫 soon.\n\n`,


      footerText: "Angela🚀",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
