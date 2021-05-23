// module.exports = {
//   name: 'Ping',
//   description: 'Get a response',
//   commands: {
//     ping: {
//       name: 'ping',
//       description: 'Get a response',
//       execute (message) {
//         // Send the embed to the same channel as the message
//         message.reply('Pong.');
//       },
//     },
//   },
// };


module.exports = {
  name: 'Ping',
  description: 'Get a response',
  commands: [
    {
      name: 'echo',
      description: 'Replies with your input!',
      options: [{
        name: 'input',
        type: 'STRING',
        description: 'The input which should be echoed back',
        required: false,
      }],
      execute (interaction) {
        interaction.reply('pongers');
      },
    },
  ],
};
