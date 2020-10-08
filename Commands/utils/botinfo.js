const Discord = require('discord.js');
const os = require('os');
const cpuStat = require('cpu-stat');
const discloud = require('discloud-status');

exports.run = async (client, msg, db, queue, serverQueue, args) => {
    let sisos;
    if (os.type() == 'Windows_NT') {
        sisos = 'Windows'
    } else {
        sisos = os.type()
    }
let cpuper;
    cpuStat.usagePercent(function(err, percent) {
        if (err) {
          return console.log(err);
        }
        cpuper = (Math.floor(percent))
    });
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${sec.padStart(2, '0')} Segundos, ${min.padStart(2, '0')} Minutos, ${hrs.padStart(2, '0')} Horas, ${day.padStart(1, '0')} Dias`
    }
    setTimeout(() => {
    msg.channel.send(`
    \`\`\`asciidoc

=  Estatísticas ${client.user.username}  =
⦁  Memoria usada          ::    ${discloud.usoRam()}
⦁  Uso e o total de RAM   ::    ${discloud.ram()}
⦁  CPU                    ::    ${os.cpus()[0].model}
⦁  Consumo da CPU         ::    ${cpuper}%
⦁  Arch                   ::    ${os.arch()}
⦁  Sistema OS             ::    ${sisos}
⦁  UP-Time                ::    ${duration(client.uptime)}
⦁  Servidores             ::    ${client.guilds.cache.size}
⦁  Comandos               ::    ${client.commands.size}
⦁  Discord.js             ::    V${Discord.version}
⦁  Node                   ::    ${process.version}

\`\`\``)

}, 1009)


}

exports.help = {
    name: "botinfo",
    description: "Mostra informacoes do bot.",
    usege: "!botinfo",
    category: "utils",
    restrict: "Membros",
    aliases: ["bi"]
}
