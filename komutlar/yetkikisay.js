const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let devtr = message.guild.roles.get("ROL ID"); //Bu rolün üstündeki kişileri sayar (En alttaki yetkili rolünün ID’sini giriniz)
  let yetkililer = message.guild.members.filter(uye => uye.highestRole.position >= devtr.position);
  let DevTR = new Discord.RichEmbed().setTitle(message.guild.name + " Yetkili Sayımı").setTimestamp().setFooter(message.author.tag + " tarafından istendi!")
  .setDescription(`Toplam Yetkili Sayısı: ${yetkililer.size}\nAktif Yetkili Sayısı: ${yetkililer.filter(uye => uye.presence.status !== "offline").size}\nSesli Kanalda Bulunanlar: ${yetkililer.filter(uye => uye.voiceChannel).size} | Bulunmayanlar: ${yetkililer.filter(uye => !uye.voiceChannel).size}`)
  // Online Üye Sayısı: ${message.guild.members.filter(uye => uye.presence.status !== "offline").size}
  message.channel.send(DevTR);
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'ys', 
  description: 'Yetkilileri sayar.', 
  usage: 'yetkilisay',
};