const {owner} = require('../../config.json')
const mongoose = require('mongoose');
const GuildModel = require('../../models/guild.js')
module.exports = async (client, msg) => {
    if(msg.author.bot || msg.channel.type === "dm") return;
    var { prefix } = await GuildModel.findOne({id: msg.guild.id}) || "null"
    if (prefix == "null" || prefix == undefined) {
        let guildM = new GuildModel({
            _id: mongoose.Types.ObjectId(),
            id: msg.guild.id,
            name: msg.guild.name,
        })
        guildM.save()
        var prefix = "!"
    }

    if(!msg.content.startsWith(prefix)) return;
//    if(msg.author.id != owner) return msg.channel.send('O bot esta em desenvolimento apenas o dono podera usar commandos')

    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if(commandfile) {
      commandfile.run(client, msg, args).catch(err => {
        console.error(`Error no ${command} | ${err}\n`); console.error(err), client.users.cache.get(owner).send(`Error no ${command} | ${err}\n`)})
    }
    if(!commandfile) return msg.reply(`O Commando \`${command}\` Não Existe.\n Use ${prefix}help Para Ajuda.`)
}
