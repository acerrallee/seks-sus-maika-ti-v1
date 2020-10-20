const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
 
  let pages = [
              '**Yetkili Komutlari**\n\n\n  **`Deneme`**',
              '**Yetkili Kurallari**\n\n\n  **`**`Deneme',
              '**Yapmamaniz Gereken Hareketler**\n\n\n  **`**`Deneme',
              ];
  let page = 1;
 
  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail('https://cdn.discordapom/attachments/487719679868272689/488329963926192158/image0.png')
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {
 
  msg.react('⬅')
  .then(r => {
    msg.react('➡')
 
      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
 
      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setColor('RANDOM')
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setColor('RANDOM')
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
 
    })
  })
};
 
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["yetkili", "Yetkili", "h"],
permLevel: 0
};
 
exports.help = {
name: 'yetkiliyardım',
description: 'Yardım Listesini Gösterir',
usage: 'yardım'
};