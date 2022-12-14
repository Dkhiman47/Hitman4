import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from "@adiwajshing/baileys";
export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "help",
			description:
				"Displays the help menu or shows the info of the command provided",
			category: "general",
			usage: `${client.config.prefix}help (command_name)`,
			aliases: ["h"],
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		parsedArgs: IParsedArgs
	): Promise<void> => {
		const user = M.sender.jid;
		const beckylynch =
			"assets/Untitled (1).mp4";
		if (!parsedArgs.joined) {
			const commands = this.handler.commands.keys();
			const categories: { [key: string]: ICommand[] } = {};
			for (const command of commands) {
				const info = this.handler.commands.get(command);
				if (!command) continue;
				if (!info?.config?.category || info.config.category === "dev") continue;
				if (
					!info?.config?.category ||
					(info.config.category === "nsfw" &&
						!(await this.client.getGroupData(M.from)).nsfw)
				)
					continue;
				if (Object.keys(categories).includes(info.config.category))
					categories[info.config.category].push(info);
				else {
					categories[info.config.category] = [];
					categories[info.config.category].push(info);
				}
			}
			let text = `β€ππ«πππ­ πππ²! *@${
				user.split("@")[0]
			}
                        \n\n *ββββ¬β’Note π»π Sideβ’β­βββ* \n\n *Read the Rules* \n\n My name is ππππ» \n\n My prefix is "${this.client.config.prefix}" \n\n  1. *Don't Call* bots to avoid blocking \n\n  2. *Don't Spam* in the group & \n *don't Pm* to avoid blocking 
				\n\n*βγβ’My Cmd Listβ’γβ*.\n\n`;
			const keys = Object.keys(categories);
			for (const key of keys)
				text += `*βββ°π»π${this.client.util.capitalize(
					key
				)} β±ββ*\nβ \`\`\`${categories[key]
					.map((command) => command.config?.command)
					.join(" , ")}\`\`\`\n\n`;
			return void this.client.sendMessage(
				M.from,
				{ url: beckylynch },
				MessageType.video,
				{
					quoted: M.WAMessage,
					mimetype: Mimetype.gif,
					caption: `${text}
                                       βββ[ πππ π©ππ ]βββββ
                                       βββββββββββββββ
                                       β   π§¨ π‘π’π­π¦ππ§47
                                       β   Β©οΈ ππ₯π»:ππ’π­ππ‘ ππ₯π?ππ»ππ₯΅
                                       βββββββββββββββ
                                       ββ[πππ―π ππ«πππ­ πππ²]ββ 
                                     π»π *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`,
					contextInfo: { mentionedJid: [user] },
				}
			);
		}
		const key = parsedArgs.joined.toLowerCase();
		const command =
			this.handler.commands.get(key) || this.handler.aliases.get(key);
		if (!command) return void M.reply(`No Command of Alias Found | "${key}"`);
		const state = await this.client.DB.disabledcommands.findOne({
			command: command.config.command,
		});
		M.reply(
			`π *Command:* ${this.client.util.capitalize(
				command.config?.command
			)}\nπ *Status:* ${
				state ? "Disabled" : "Available"
			}\nβ© *Category:* ${this.client.util.capitalize(
				command.config?.category || ""
			)}${
				command.config.aliases
					? `\nβ¦οΈ *Aliases:* ${command.config.aliases
							.map(this.client.util.capitalize)
							.join(", ")}`
					: ""
			}\nπ *Group Only:* ${this.client.util.capitalize(
				JSON.stringify(!command.config.dm ?? true)
			)}\nπ *Usage:* ${command.config?.usage || ""}\n\nπ *Description:* ${
				command.config?.description || ""
			}`
		);
	};
}
