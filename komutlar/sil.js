const Discord = require('discord.js');
const talkedRecently = new Set();
exports.run = function(client, message,  args) {
let codeworkprefix = args.slice(0).join('!');
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setDescription(`Bu özelliği kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olmalısınız.`).setColor('BLACK'));
if(!args[0]) return message.channel.send(new Discord.RichEmbed().setDescription(message.author + ", Lütfen 1-99 Arası Sayı Girin!").setColor('BLACK'));
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(new Discord.RichEmbed().setDescription(`${message.member}, ${args[0]} Adet Mesaj Başarıyla Uzaya Fırlatıldı! :rocket:`).setColor('BLACK')).then(msg => msg.delete(5000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil'
};