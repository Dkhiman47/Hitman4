import { MessageType, Mimetype } from "@adiwajshing/baileys";

import MessageHandler from "../../Handlers/MessageHandler";

import BaseCommand from "../../lib/BaseCommand";

import WAClient from "../../lib/WAClient";

import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {

  constructor(client: WAClient, handler: MessageHandler) {

    super(client, handler, {

      command: "support",

      aliases: ["group","gc"],

      description: "Gets the support group links",

      category: "general",

      usage: `${client.config.prefix}Support`,

      baseXp: 10,

    });

  }

  run = async (M: ISimplifiedMessage): Promise<void> => {

    await this.client.sendMessage(

      M.sender.jid,

      ` _*I Am hitman47🚀*_\n\n

        _*𝐒𝐔𝐏𝐏𝐎𝐑𝐓*_:         

*📮𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗚𝗿𝗼𝘂𝗽 𝗟𝗶𝗻𝗸*


https://chat.whatsapp.com/ChvkiST07BKGSgjX71nWQO
`,

      MessageType.text

    );

    return void M.reply("Sent you the Group Link in personal message");

  };

}
