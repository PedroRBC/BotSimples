const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    let m = await msg.channel.send("🏓 Ping....");
    m.edit(`🏓 Pong! A Latência é ${m.createdTimestamp - msg.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ws.ping)}ms`);
}
exports.help = {
    name: "ping",
    description: "Mostra a Latencia do bot.",
    usege: "!Ping",
    category: "miscellaneous",
    restrict: "Membros",
    aliases: []
}
