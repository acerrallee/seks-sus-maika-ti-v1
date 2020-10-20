const Discord = require('discord.js');
exports.run = (client, message, args) => {

    if (!message.guild) return;

    let guild = message.guild
    let rol = message.mentions.roles.first()       //DevTR
    let user = message.mentions.members.first()

    if (!user) return message.reply('**Kimden rol alınacağını yazmadın!**').catch(console.error);
    if (rol.length < 1) return message.reply('**Rolü belirtmedin**');
    user.removeRole(rol);

    const embed = new Discord.RichEmbed()
        .setDescription(`${user} kullanıcısından başarıyla ${rol} rolü alındı!`)
        .setFooter('DevTR | xFalcon', client.user.avatarURL)
        .setColor(rol.hexColor)
        .setTimestamp()
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rolal'],
    permLevel: 0
};

exports.help = {
    name: 'rol-al',
    description: 'İstediğiniz kişiden istediğiniz rolü alır.',
    usage: 'rol-al [kullanıcı] [@rol]'
};