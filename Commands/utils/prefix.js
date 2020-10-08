const Discord = require('discord.js');
const GuildModel = require('../../models/guild.js')

exports.run = async (client, msg, args) => {
    var { prefix } = await GuildModel.findOne({id: msg.guild.id})
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
        if(args.length > 0) {
            //Setar
        }
        else {
            msg.reply(`Olá meu Prefixo é \`\`${prefix}\`\` `)
        }
    } else {
    if(args.length == 0) msg.reply(`Olá meu Prefixo é \`\`${prefix}\`\` `)
    }

}
exports.help = {
    name: "prefix",
    description: "Mostra o Prefix do bot.",
    usege: "!Prefix",
    category: "utils",
    restrict: "Membros",
    aliases: []
}
