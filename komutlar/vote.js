const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setTitle("<a:2_:752507248282173471> Sunucu Vote Sitesi")
  .setDescription(`https://top.gg/servers/697761922304704582/vote`)
  
  message.channel.send(embed)
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'vote'
};