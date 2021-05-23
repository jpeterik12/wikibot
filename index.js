/*eslint no-console: 0*/
const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
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
  // client.users.fetch(process.env.OWNERID).then((owner) => {
  //   owner.send(`\`Online: ${new Date()}\``);
  // });
});

function handleCommand (interaction) {
  const commandName = interaction.commandName;
  const command = client.commands.get(commandName);
  // || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  // if (!command) {
  //   // message.react('\u{1F914}'); // Thinking Emoji
  //   return;
  // }

  // if (command.ownerOnly && message.author.id !== process.env.OWNERID) {
  //   message.channel.send('This is an owner only command');
  //   return;
  // }

  // if (command.guildOnly && !message.guild) {
  //   return message.channel.send('I can\'t execute that command inside DMs!');
  // }

  // if (args.length < command.args) {
  //   let reply = `You didn't provide enough arguments, ${message.author}!`;

  //   if (command.usage) {
  //     reply += `\nThe proper usage would be: \`${prefix}${commandName} ${command.usage}\``;
  //   }

  //   return message.channel.send(reply);
  // }

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    // message.channel.send('There was an error trying to execute that command!');
    // client.fetchUser(process.env.OWNERID).then((owner) => {
    //   owner.send(`Error ${error}`);
    // });
  }
}

// client.on('message', (message) => {
//   let stopProccessing = false;
//   for (const handler of client.specialHandlers) {
//     if (handler(message)) stopProccessing = true;
//   }
//   if (message.author.bot || stopProccessing) return;
//   else if (message.content.startsWith(process.env.PREFIX)) handleCommand(message, process.env.PREFIX);
// });

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



client.login(process.env.BOTTOKEN);
