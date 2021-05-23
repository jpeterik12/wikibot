/*eslint no-console: 0*/
const fs = require('fs');
const Discord = require('discord.js');
const CONFIG = require('./config.json');
process.chdir(__dirname);


const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
  ],
});


client.on('disconnect', () => {
  console.log('DC');
  process.exit();
});


client.commands = new Discord.Collection();
const moduleFiles = fs.readdirSync('./modules').filter((file) => file.endsWith('.js'));
client.specialHandlers = [];
for (const file of moduleFiles) {
  const module = require(`./modules/${file}`);
  if (module.commands) {
    for (const command in module.commands) client.commands.set(module.commands[command].name, module.commands[command]);
  }
  if (module.setup) module.setup(client);
  if (module.specialHandler) client.specialHandlers.push(module.specialHandler);
}

client.on('ready', () => {
  console.log('Logged in!');
});

function handleCommand (interaction) {
  const commandName = interaction.commandName;
  const command = client.commands.get(commandName);
  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
}


client.on('interaction', interaction => {
  // If the interaction isn't a slash command, return
  if (!interaction.isCommand()) return;
  handleCommand(interaction);
});

client.once('ready', () => {
  // Creating a global command
  // client.commands.forEach((commandData) => client.application.commands.create(commandData));
  client.commands.forEach((commandData) => client.guilds.cache.get('736091686094110752').commands.create(commandData));
});



client.login(CONFIG.token);
