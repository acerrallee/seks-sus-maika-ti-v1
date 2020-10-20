const Discord = require('discord.js');


exports.run = function(client, message) {

    const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription('૨')

    message.channel.send(embed);

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['tag'],
  permLevel: 0 
};

exports.help = {
  name: 'tag', 
  description: 'Avatarınızı gösterir',
  usage: 'avatar'
};