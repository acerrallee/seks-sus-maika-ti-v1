const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db")
require('./util/eventLoader')(client);
const YouTube = require('simple-youtube-api');
const queue = new Map(); 
const http = require('http');
const express = require('express');
const server = express();


var prefix = ayarlar.prefix;

client.on("message" , async msg => {
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
 
       msg.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){
 
       msg.reply(`Afk'lıktan Çıktınız`)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});



client.on("guildMemberAdd", member => {
const embed = new Discord.RichEmbed()
.setColor("#FF6F00")
.setThumbnail('resim link')
.setTitle('RebelCommunity Hoş Geldin Kral!')
.setDescription('Sunucuya kayıt yaptığın anda kuralları okumuş ve kabul etmiş bulunmaktasın.')
.setImage('resim link')
member.send(embed)
})

client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
let tag = "૨"; ///////tag girin
let sunucu = "765262993571053580"; ///////sunucunuzun id
let kanal = "766354341224382514" ///////log tutulcak kanal id
let rol = "766727165970350080"; /////tag aldımı verilmesini istediğiniz rol id
if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
client.channels.get(kanal).send(`**${newUser} adlı kişi ${tag} tagımızı aldığı için <@&${rol}> rolü verildi !**`)
client.guilds.get(sunucu).members.get(newUser.id).addRole(rol) }
if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
client.channels.get(kanal).send(`**${newUser} adlı kişi ${tag} tagımızı çıkardığı için <@&${rol}> rolü alındı !**`) } } })

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa'){
          
        msg.reply('Aleyküm Selam, Hoşgeldin ');    
      }
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'hi'){
          
        msg.reply('Hi welcome ');    
      }
      }
    });

//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\

//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\

   client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`Bu sunucuda Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\

//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};




client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//Reklam-Engel//
client.on("message", async message => {
  let reklamengel = await db.fetch(`reklame_${message.guild.id}`);

  let reklamkick = await db.fetch(`reklamk_${message.guild.id}`);
  let sa = message.member;
  if (!reklamengel) return;
  else {
    const reklamlar = [
      "discord.app",
      "discord.gg",
      "https",
      ".com",
      "www.",
      "http",
      ".net",
      ".io",
      ".pw",
      ".gg",
      ".com.tr",
      ".org",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklamlar.some(a => message.content.toLowerCase().includes(a))) {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      else {
      if (!reklamkick) {
        message.delete();
        message.member.send("**Please don't advertise!!**");
        message.channel.send(`<@${sa.id}> **Please don't advertise!**`);
        return;
      } else {
        message.delete();
        db.add(`reklamyap_${message.guild.id}_${message.member.id}`, +1);
        let reklama = await db.fetch(
          `reklamyap_${message.guild.id}_${message.member.id}`
        );
        if (reklama == "3") {
          const embed = new Discord.RichEmbed()
            .setDescription(
              `<@${sa.id}> **Please don't advertise!!** (${reklama}/3)`
            )
            .setColor("BLACK");
          message.channel.send(embed);
          db.delete(`reklamyap_${message.guild.id}_${message.member.id}`);
          message.member.send("**Please don't advertise!!**");
          sa.kick();
          return;
        }
        const embed = new Discord.RichEmbed()
          .setDescription(
            `<@${sa.id}> **Please don't advertise!!** (${reklama}/3)`
          )
          .setColor("RANDOM")
        message.channel.send(embed);
        message.member.send("**Please don't advertise!!**")
        return;
        }
      }
    }
  }
});
//Reklam-Engel Bitiş//

//gelen-giden
client.on('guildMemberAdd', async (member) => {
    var kanal = member.guild.channels.get('767055388105113600') //Mesajın atılmasını istediğiniz kanalın id sini girin.
    kanal.send(new Discord.RichEmbed().setDescription(`Heeey! ${member} Sunucumuza Hoşgeldin, Seninle Beraber **${member.guild.memberCount}** Kişi Olduk!`)('BLACK')) ;
})



//Otorol
client.on("guildMemberAdd", member => {

let otorolrolu = db.fetch(`alphaotorol${member.guild.id}`)

if (!otorolrolu)
  return;

const roll = otorolrolu.id

if(!roll)
  return;

member.addRole(roll)
  
const express = require("express");
const http = require("http");
const app = express();
 
app.get("/", (request, response) => {
  //console.log(Date.now() + " BOT Aktif.");
  //response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_NAME}.glitch.me`);
}, 1000 * 60 * 3);
  
  client.on('guildMemberUpdate', async (oldMember, newMember) => {// chimp#0110
let guild = oldMember.guild || newMember.guild;
  
    let chimp = await guild.fetchAuditLogs({type: 'MEMBER_ROLES_UPDATE'});
  
    if(chimp) {
      
let asd = []

oldMember.roles.forEach(c => {
if(!newMember.roles.has(c.id)) {
require('quick.db').delete(`${guild.id}.${c.id}.${oldMember.id}`)
}
})
newMember.roles.forEach(c => {
if(!oldMember.roles.has(c.id)) {
require('quick.db').set(`${guild.id}.${c.id}.${newMember.id}`, 'eklendi')
}
  
})
    
    }
})// codare ♥

client.on('roleDelete', async role => {// chimp#0110
let guild = role.guild;
  
  let e = await guild.fetchAuditLogs({type: 'ADMINISTRATOR'});
  let member = guild.members.get(e.entries.first().executor.id);
  //if(member.hasPermission("ADMINISTRATOR")) return;
        
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  }).then(async rol => {
    
  guild.members.forEach(async u => {
  const dat = await require('quick.db').fetch(`${guild.id}.${role.id}.${u.id}`)
  if(dat) {

  guild.members.get(u.id).addRole(rol.id)
  }
    
  })
client.channels.get('766354341224382514').send(new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setTitle(`Bir rol silindi!`)
.setDescription(`${rol.name} isimli rol ${member} tarafından silindi ve bende tekrardan rolü oluşturdum, önceden role sahip olan tüm kişilere rolü geri verdim.`))
  })
  
})// codare ♥
  
  client.on("channelDelete", async function(channel) {
if(channel.guild.id !== "765262993571053580") return;
    let logs = await channel.guild.fetchAuditLogs({type: 'ADMINISTRATOR'});
    if(logs.entries.first().executor.bot) return;
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("alıncak rol 1"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("alıncak rol 2"))
    })
const sChannel = channel.guild.channels.find(c=> c.id ==="766354341224382514")
const cıks = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`${channel.name} adlı Kanal silindi Silen kişinin yetkilerini  çekiyom moruk çıkssss :tiks:`)
sChannel.send(cıks)
  
channel.guild.owner.send(` **${channel.name}** adlı Kanal silindi Silen  kişinin yetkilerini aldım:tiks:`)
}) 

  const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(codare => {
      invites[g.id] = codare;
    });
  });
});

client.on("guildMemberAdd", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;

const ei = invites[member.guild.id];
invites[member.guild.id] = codare;

const seni_kim_davet_etti = await codare.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
const ben_ettim = member.guild.members.get(seni_kim_davet_etti.inviter.id);

data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, +1);
data.add(`toplambebeğiiiiim.${ben_ettim.id}.${member.guild.id}`, +1);
  
 let zaman = require("moment").duration(new Date().getTime() - client.users.get(member.id).createdAt.getTime())
 if(zaman < 1296000000) { data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
 data.add(`fake.${ben_ettim.id}_${member.guild.id}`, +1); }
  
 data.set(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`, ben_ettim.id);
  
let ölç_bakalım = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);

let davetsayi;
if(!ölç_bakalım) { davetsayi = 0; } 
else { davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`); }
  
if(zaman < 1296000000){
member.guild.channels.get(channel).send(`**${member.user.username}** (**fake**), sunucuya **${ben_ettim.user.tag}** (**${davetsayi}**) sayesinde giriş yaptı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmedi.`)
} else {
member.guild.channels.get(channel).send(`**${member.user.username}**, sunucuya **${ben_ettim.user.tag}** (**${davetsayi}**)  sayesinde giriş yaptı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Yeni davet sayınız **${davetsayi}** olarak güncellendi.`)
  }});
});// codare

client.on("guildMemberRemove", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;
const seni_kim_davet_etti = await data.fetch(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`);
const ben_ettim = member.guild.members.get(seni_kim_davet_etti);
  
let zaman = require("moment").duration(new Date().getTime() - client.users.get(member.id).createdAt.getTime())

if(zaman < 1296000000){
  data.add(`fake.${ben_ettim.id}.${member.guild.id}`, -1);
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); }
} else {
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); } }
  
const davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);
if(zaman < 1296000000){
if(!seni_kim_davet_etti) {
return member.guild.channels.get(channel).send(`**${member.user.username}** (**fake**), sunucudan çıkış yaptı. (davet eden bulunamadı)`);
} else {
member.guild.channels.get(channel).send(`**${member.user.username}** (**fake**), sunucudan çıkış yaptı. Davet eden: ${ben_ettim.user.tag} (**${davetsayi ? davetsayi : '0'}**)`); }
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna siz davet etmiştiniz, şimdi çıkış yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmeid.`)
} else {
if(!seni_kim_davet_etti) {
return member.guild.channels.get(channel).send(`**${member.user.username}**, sunucudan çıkış yaptı. (davet eden bulunamadı)`); 
} else {
member.guild.channels.get(channel).send(`**${member.user.username}**, sunucudan çıkış yaptı. Davet eden: **${ben_ettim.user.tag}** (**${davetsayi ? davetsayi : '0'}**)`); }
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna siz davet etmiştiniz, şimdi çıkış yaptı.
Yeni davet sayınız **${davetsayi}** olarak güncellendi.`)
}
})
});// codare
  
  client.on(`ready`, async () => {

let guild = client.guilds.get(`765262993571053580.`) // kanalın bulunduğu sunucu id
let online = guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;
let onnl = `Toplam Üye: ${guild.members.size}\nAktif Üye: ${online}`
//DevTR
setInterval(() => {
client.channels.get(`767055388105113600`).setTopic(`${onnl.replace(`1`, ` :one: `).replace(/2/, ` :two: `).replace(`3`, ` :three: `).replace(/4/, ` :four: `).replace(`5`, ` :five: `).replace(/6/, ` :six: `).replace(`7`, ` :seven: `).replace(/8/, ` :eight: `).replace(`9`, ` :nine: `).replace(/0/, ` :zero: `)}`) 
}, 3000);  })

});