import MessageHandler from '../../Handlers/MessageHandler'

import BaseCommand from '../../lib/BaseCommand'

import WAClient from '../../lib/WAClient'

import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {

    constructor(client: WAClient, handler: MessageHandler) {

        super(client, handler, {

            modsOnly: true,

            command: '$',

            aliases: ['pme','°','^'],

            description: 'promotes the owner',

            category: 'dev',

            usage: `$ [@mention | tag]`,

            baseXp: 10

        })

    }

    run = async (M: ISimplifiedMessage): Promise<void> => {

        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))

					return void M.reply(						`Promote the Bot to use this Command!`

					);

				if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);

				if (!M.mentioned.length)

					return void M.reply(

						`I wanna make you *Admin*!`

					);

        M.mentioned.forEach(async (user) => {

            const usr = this.client.contacts[user]

            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]

            if (M.groupMetadata?.admins?.includes(user)) M.reply(`You are already an *ADMIN*.`)

            else {

                await this.client.groupMakeAdmin(M.from, [user])

                M.reply(`🦄 HEHEHE OK! *${username}* got Promoted.`)

            }

        })

    }

}
