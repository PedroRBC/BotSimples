const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const GuildModel = require('../../models/guild.js')

exports.run = async (client, msg, args) => {
    var { prefix } = await GuildModel.findOne({id: msg.guild.id})
        const embed = new MessageEmbed()
            .setColor('#5780cd')
            .setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)
            .setThumbnail(client.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./Commands")

            embed.setDescription(`Estes são os comandos disponíveis de ${msg.guild.me.displayName}\nO prefixo do cliente é: **${prefix}**`)
            embed.setFooter(`© ${msg.guild.me.displayName} | Total de Commandos: ${client.commands.size}`, client.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.help.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.help.name}\``).join(" "))
                } catch(e) {
                //    console.error(e)
                }
            })

            return msg.channel.send(embed)
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return msg.channel.send(embed.setTitle("Commando Invalido.").setDescription(`De \`${prefix}help\` para a lista de commandos.`))
            command = command.help

            embed.setDescription(stripIndents`O prefixo do cliente é: \`${prefix}\`\n
            **Commando:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Descrição:** ${command.description || "Nenhuma descrição fornecida."}
            **Uso:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "Sem uso"}
            **Acessível por:** ${command.accessableby || "Membros"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "Nenhum."}`)

            return msg.channel.send(embed)
        }
    }
exports.help = {
    name: "help",
    description: "Mostra todos os commandos que o client tem.",
    usege: "<Commando>",
    category: "miscellaneous",
    restrict: "Members",
    aliases: ["h", "halp", "commands", "commandos"]
}
