import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import yts from "yt-search";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytsearch",
      description: "Searches YT",
      category: "youtube",
      aliases: ["yts"],
      usage: `${client.config.prefix}yts [term]`,
      baseXp: 20,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined) return void M.reply("π Provide a search term");
    const term = joined.trim();
    const { videos } = await yts(term);
    if (!videos || videos.length <= 0)
      return void M.reply(`β No Matching videos found for : *${term}*`);
    const length = videos.length < 10 ? videos.length : 10;
    let text = `π *Results for ${term}*\n`;
    for (let i = 0; i < length; i++) {
      text += `*#${i + 1}*\nπ *Title:* ${videos[i].title}\nπ *Channel:* ${
        videos[i].author.name
      }\n π *Duration:* ${videos[i].duration}\nπ *URL:* ${videos[i].url}\n\n`;
    }
    M.reply("πDownloading...π§");
    this.client
      .sendMessage(M.from, text, MessageType.extendedText, {
        quoted: M.WAMessage,
        contextInfo: {
          externalAdReply: {
            title: `Search Term: ${term}`,
            body: `hitman47π`,
            mediaType: 2,
            thumbnailUrl: videos[0].thumbnail,
            mediaUrl: videos[0].url,
          },
        },
      })
      .catch((reason: any) =>
        M.reply(`An error occurred, Reason: ${reason}`)
      );
  };
}
