const Discord = require('discord.js');
const { getMemberAll, getMember } = require('../../functions.js')
const mongoose = require('mongoose');
const MarryModel = require('../../models/marry.js')
const GuildModel = require('../../models/guild.js')
exports.run = async (client, msg, args) => {
    var Marry = await MarryModel.find({"persons.id": msg.author.id }) || "null"
    var { prefix } = await GuildModel.findOne({id: msg.guild.id})
    var wife;
    if (Marry[0].persons[0].id == msg.author.id) { wife = await getMemberAll(client, Marry[0].persons[1].id) }
    else { wife = await getMemberAll(client, Marry[0].persons[0].id) }
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

        embed.setAuthor(msg.author.username,msg.author.avatarURL())
        embed.setDescription(`🙁 | ${msg.author}, você está solteiro.`)
        embed.setFooter(`Use ${prefix}marry <user> para casar`)
        msg.channel.send(embed)
    }
    else {
        let date = new Date(Number(Marry[0].time)).toLocaleDateString("en-US")
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
