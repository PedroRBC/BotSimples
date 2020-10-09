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
    else { wife = await getMemberAll(client, Marry[0].persons[0].id) }
}
const embed = new Discord.MessageEmbed();
embed.setColor('#FFB6C1')
if (Marry == "null") {
    embed.setAuthor(msg.author.username,msg.author.avatarURL())
    embed.setDescription(`🙁 | ${msg.author}, você está solteiro.`)
    embed.setFooter(`Use ${prefix}marry <user> para casar`)
    return msg.channel.send(embed)
} else {
    embed.setAuthor(msg.author.username,msg.author.avatarURL())
    embed.setDescription(`${msg.author}, Gostria de se divorciar de ${wife}?\nResponda com: \`\`sim\`\` ou \`\`não\`\` Para se decidir.`)
    msg.channel.send(msg.author,embed)
}
var response;
var filter = m=>(m.content.toLowerCase().startsWith("sim")||m.content.toLowerCase().startsWith("não")||m.content.toLowerCase().startsWith("nao")) && m.author.id == msg.author.id
await msg.channel.awaitMessages(filter,{max: 1, time: 60000, errors: ['time']})
.then(collected => { let pass1=collected.map(msg=>msg.content);let pass2=pass1[0];response=pass2 })
if(response=='não'||response=='nao') {
    const embed2 = new Discord.MessageEmbed();
    embed2.setColor('#FFB6C1')
    embed2.setAuthor(msg.author.username,msg.author.avatarURL())
    embed2.setDescription(`${msg.author}, Parabéns vocês estão Continuam casados!, 💕`)
    embed2.channel.send(embed2)
}
else {
    //MarryModel.deleteOne({"persons.id": msg.author.id }) //.save()
    //MarryModel.remove({"persons.id": msg.author.id })// (Marry[0]._id)
    (await MarryModel.findOneAndDelete({"persons.id": msg.author.id })).save
    const embed = new Discord.MessageEmbed();
    embed.setColor('#FFB6C1')
    embed.setAuthor(msg.author.username,msg.author.avatarURL())
    embed.setDescription(`${msg.author}, Parabéns vocês estão Divorciados, 💔`)
    msg.channel.send(embed)
 }
}
exports.help = {
    name: "divorce",
    description: "Divorcia de um usuario",
    usege: "!divorce",
    category: "utils",
    restrict: "Membros",
    aliases: ["divorcio"]
}
