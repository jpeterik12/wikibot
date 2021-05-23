module.exports = {
  name: 'example',
  description: 'Example for all command features',
  commands: {
    example: {
      name: 'example',
      description: 'Example for all command features',
      aliases: ['ex', 'eg'],
      args: 1,
      usage: '<argument>',
      ownerOnly: true,
      guildOnly: true,
      execute(message, args) {
        message.channel.send('runs when command/alias is ran');
        // Guild Options
        message.client.guildOptions.set(message.guild.id, 'name', 'data', () => { });
        message.client.guildOptions.get(message.guild.id, 'name', (err, data) => {
          console.log(data);
        });
      },
    },
  },
  setup(client) {
    console.log('runs when module is loaded onto the client');
    // Guild Options
    client.guildOptions.initColumn('name', 'type', () => { });
  },
  specialHandler(message) {
    console.log('runs on all messages.');
    console.log('Return true to prevent the message from being handled by the default command handler');
  },
};
