const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {

    if (args.length < 1) return msg.reply("Nada para dizer?").then(m => m.delete(10000))

let RANDOM = ((1 << 24) * Math.random() | 0).toString(16);
    if (args[0] === "embed") {
    const embed = new MessageEmbed()
    .setColor(RANDOM)
    .setDescription(args.slice(1).join(" "))
    .setTimestamp()
    msg.delete()
    msg.channel.send(embed)
} else {
    msg.delete()
    msg.channel.send(args.join(" "))
}
}

exports.help = {
    name: "say",
    description: "faca o bot falar.",
    usege: "!say",
    category: "utils",
    restrict: "Staff",
    aliases: []
}
