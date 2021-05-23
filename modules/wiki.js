const mw = require('nodemw');
const bot = new mw({
  protocol: 'https',
  server: 'wiki.gm4.co',
  path: '/',
  debug: false,
});

module.exports = {
  name: 'GM4Wiki',
  description: 'Search for page',
  commands: [
    {
      name: 'wiki',
      description: 'Returns a url to the first result of your search!',
      options: [{
        name: 'query',
        type: 'STRING',
        description: 'The search query',
        required: true,
      }],
      execute (interaction) {
        bot.search(interaction.options[0].value, (err, res) => {
          if (res[0]) {
            const title = res[0].title;
            return interaction.reply('https://wiki.gm4.co/wiki/' + encodeURIComponent(title.replace(/ /g, '_')));
          }
          return interaction.reply('404: No matching wiki page Not Found');
        });
      },
    },
  ],
};
