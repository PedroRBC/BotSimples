const Discord = require('discord.js');                  //Discord consts.
const client = new Discord.Client();                    //Discord consts.
const { token } = require('./config.json');             //Discord consts.

["aliases", "commands"].forEach(x => client[x] = new Discord.Collection());
["start", "command", "event"].forEach(x => require(`./handlers/${x}`)(client));
client.login(token);
