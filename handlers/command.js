const { readdirSync } = require("fs")
const ascii = require("ascii-table");
let table = new ascii("Commandos");
table.setHeading("Commando", "Status.");
module.exports = (client) => {
    const load = dirs => {
        const commands = readdirSync(`./Commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let props = require(`../Commands/${dirs}/${file}`);
            if (props.help.name) {
              client.commands.set(props.help.name, props);
              if (props.help.aliases) props.help.aliases.forEach(a => client.aliases.set(a, props.help.name));
              table.addRow(file, '✅');
          } else {  table.addRow(file, `❌  -> falta um help.name ou help.name não é uma string.`);
              continue;}
          };
        };
        ["miscellaneous", "utils"].forEach(x => load(x));
        console.log(table.toString());
};
