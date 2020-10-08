const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${day.padStart(1, '0')} Dias,\n ${hrs.padStart(2, '0')} Horas,\n ${min.padStart(2, '0')} Minutos,\n ${sec.padStart(2, '0')} Segundos, `
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(`**Uptime**`)
        .setDescription(`**Eu estou online a**\n ${duration(client.uptime)}`)
        .setColor('RED')
    msg.channel.send(embed)
}

exports.help = {
    name: "uptime",
    description: "Mostra o tempo que o bot esta online.",
    usege: "!uptime",
    category: "miscellaneous",
    restrict: "Membros",
    aliases: ["ut"]
}
