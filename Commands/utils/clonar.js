const Discord = require('discord.js');
const { getMember } = require('../../functions')
exports.run = async (client, msg, args) => {

    if (args.length == 1) return msg.channel.send('ex: !clonar @membro msg')
    let ment = getMember(msg,args[0])
    msg.delete()
    const webhook = await msg.channel.createWebhook(ment.displayName,{avatar: ment.user.displayAvatarURL(), reason: `Commando !clonar feito por ${msg.author.username}`})
    await webhook.send(`${args.slice(1).join(" ")}`)
    webhook.delete(`Commando !clonar feito por ${msg.author.username}`)
}
exports.help = {
    name: "clonar",
    description: "Faz um Bot Do Usuario Fazendo ele falar um texto Pre-Definido por Voce.",
    usege: "!clonar @membro msg",
    category: "utils",
    restrict: "Membros",
    aliases: []
}
