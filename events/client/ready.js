const Discord = require('discord.js')
module.exports = async (client) => {
    console.log(`
    ╔═════════════════════════════════════════════════════»
    ║ Logado como ${client.user.tag}!
    ║ Usuarios nos servidores: ${client.users.cache.size}.
    ║ Com ${client.channels.cache.size} Chats.
    ║ E Tambem com ${client.guilds.cache.size} Servers.
    ╚═════════════════════════════════════════════════════»
`);

//Status
client.user.setPresence({ game: { name: 'obs!help , para saber os commandos!', type: 'WATCHING'}, status: 'dnd'})
}
