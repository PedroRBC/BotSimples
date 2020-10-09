const Discord = require('discord.js');
const { getMemberAll, getMember } = require('../../functions.js')
const mongoose = require('mongoose');
const MarryModel = require('../../models/marry.js')
const GuildModel = require('../../models/guild.js')
exports.run = async (client, msg, args) => {
    var Marry = await MarryModel.find({"persons.id": msg.author.id })
    if (Marry[0] == undefined) Marry = "null"
    var { prefix } = await GuildModel.findOne({id: msg.guild.id})
    var wife;
    if(Marry != "null") {
    if (Marry[0].persons[0].id == msg.author.id) { wife = await getMemberAll(client, Marry[0].persons[1].id) }
    else { wife = await getMemberAll(client, Marry[0].persons[0].id) }  }
if(args.length == 0) {
    const embed = new Discord.MessageEmbed();
    embed.setColor('#FFB6C1')
    if (Marry == "null") {
        embed.setAuthor(msg.author.username,msg.author.avatarURL())
        embed.setDescription(`🙁 | ${msg.author}, você está solteiro.`)
        embed.setFooter(`Use ${prefix}marry <user> para casar`)
        msg.channel.send(embed)
    }
    else {
        let date = new Date(Number(Marry[0].time)).toLocaleDateString("pt-BR")
        embed.setAuthor(msg.author.username,msg.author.avatarURL())
        embed.setDescription(`❤️ | ${msg.author}, você está casado com ${wife}.`)
        embed.setFooter(`Desde (${date})`)
        msg.channel.send(msg.author,embed)
    }
} else {
    const embed = new Discord.MessageEmbed();
    embed.setColor('#FFB6C1')
    if (Marry == "null") {
    let newwife = getMember(msg, args[0])
    if(newwife.user.id == msg.author.id) return msg.channel.send(`${msg.author}, Não consegui achar uma pessoa apenas com \`\`${args[0]}\`\``)
    msg.channel.send(`${newwife}, Gostaria de se casar com o ${msg.member}\nResponde com: \`\`sim\`\` ou \`\`não\`\``)
    var response;
    var filter = m=>(m.content.toLowerCase().startsWith("sim")||m.content.toLowerCase().startsWith("não")||m.content.toLowerCase().startsWith("nao"))// && m.author.id == newwife.id
    await msg.channel.awaitMessages(filter,{max: 1, time: 60000, errors: ['time']})
    .then(collected => { let pass1=collected.map(msg=>msg.content);let pass2=pass1[0];response=pass2 })
    if(response=='não'||response=='nao') return msg.channel.send(`${newwife}, Vc reijeitou a proposta do ${msg.author}`)
    else {
        new MarryModel({
            _id: mongoose.Types.ObjectId(),
            persons: [{id:msg.author.id,name:msg.author.username},{id:newwife.user.id,name:newwife.user.username}],
            time: Date.now(),
        }).save()
        const embed = new Discord.MessageEmbed();
        embed.setColor('#FFB6C1')
        embed.setAuthor(newwife.user.username,newwife.user.avatarURL())
        embed.setDescription(`Parabéns vocês estão casados, Muitos amores para vcs 💕`)
        msg.channel.send(embed)
     }
    }
    else {
        let date = new Date(Number(Marry[0].time)).toLocaleDateString("pt-br")
        embed.setAuthor(msg.author.username,msg.author.avatarURL())
        embed.setDescription(`❤️ | ${msg.author}, você está casado com ${wife}.`)
        embed.setFooter(`Desde (${date})`)
        msg.channel.send(msg.author,embed)
    }
}

}
exports.help = {
    name: "marry",
    description: "Casar com um usuario",
    usege: "!marry <User>",
    category: "utils",
    restrict: "Membros",
    aliases: []
}
