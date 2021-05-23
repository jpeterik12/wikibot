// const mineflayer = require('mineflayer') // eslint-disable-line
// /**
//  * @param {mineflayer.Bot} bot // to enable intellisense
//  */

const mw = require('nodemw');
const bot = new mw({
  protocol: 'https', // Wikipedia now enforces HTTPS
  server: 'wiki.gm4.co', // host name of MediaWiki-powered site
  path: '/', // path to api.php script
  debug: false, // is more verbose when set to true
});

// bot.getArticle(results[0].title, function (err, data) {
//   // error handling
//   if (err) {
//     console.error(err);
//     return;
//   }
//   bot.parse(data, results[0].title, function (err, data) {
//     // error handling
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });
// });

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
            // bot.getArticle(title, (err, res) => {
            //   if (res.includes('#REDIRECT')) title = res.match(/\[\[.*(?=]])/)[0].slice(2);
            // });
            return interaction.reply('https://wiki.gm4.co/wiki/' + encodeURIComponent(title.replace(/ /g, '_')));
          }
          return interaction.reply('404: Page Not Found');
        });
      },
    },
  ],
};
