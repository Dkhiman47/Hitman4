import MessageHandler from '../../Handlers/MessageHandler'

import BaseCommand from '../../lib/BaseCommand'

import WAClient from '../../lib/WAClient'

import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {

    constructor(client: WAClient, handler: MessageHandler) {

        super(client, handler, {

            modsOnly: true,

            command: 'odemote',

            aliases:['dme','<','>'],

            description: 'demotes the mentioned users',

            category: 'dev',

            usage: `${client.config.prefix}odemote [mention | @tag]`,

            baseXp: 0

        })

    }

    run = async (M: ISimplifiedMessage): Promise<void> => {

        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))

            return void M.reply(`Promote the Bot to use this Command!`)

        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)

        if (!M.mentioned.length) return void M.reply(`Tag the Admin you want to demote`)

        M.mentioned.forEach(async (user) => {

            const usr = this.client.contacts[user]

            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]

            if (!M.groupMetadata?.admins?.includes(user)) M.reply(`*${username}* wasn't an Admin before`)

            else if (user !== this.client.user.jid) {

                await this.client.groupDemoteAdmin(M.from, [user])

                M.reply(` 🦄 HEHEHE OK!*${username}* got Demoted.`)

            }

        })

    }

}
