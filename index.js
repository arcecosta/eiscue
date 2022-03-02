const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_PRESENCES","GUILD_MEMBERS","GUILD_MESSAGES"] })
//const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

//const axios = require('axios').default;
const keepAlive = require("./server");const dotenv = require('dotenv');
dotenv.config();
const fs = require("fs");
let prefix = '/'
const db = require('megadb');

// ------------------------Comandos-----------------------------
client.comandos= new Discord.Collection()
let archivos = fs.readdirSync('./comandos').filter((file) => file.endsWith('.js'))
/*for(var arch of archivos){
  let comando = require("./comandos/"+arch)
  client.comandos.set(comando.name, comando)
  //let cargado = []; cargado.push(arch); console.log(cargado)
}*/
// -----------------------Fin-Comandos--------------------------

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://hokage:qawsedrftgyhujikolpñ@cluster0.asbzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    //userFindAndModify:false
    }).then(() => {
        console.log("Conectado a la BD")
    }).catch((e) => {
        console.log("Error de conexion "+e)
    })

client.on("ready", () => {
   client.user.setPresence({
    status: 'online',
    activities: [{ name:'Visual Studio Code',type: 'PLAYING' }]
  });
  console.log("Bitch, I'm ready!");



});

//require("./db")
/*const UserSchema = require("./modelos/ytSchema")
(() => {
    const newUser = new UserSchema({
        name:"juan"
    });

    newUser.save((err, user) => {
        if(err) { console.log(err);}
        else { console.log(user);}
    })
})*/


const {getChannelVideos} = require("yt-channel-info")
//const db = require("megadb")
const yt = new db.crearDB("yt")
const canalYT = "806528869153898507"; //rule34
const canalPruebas= "890315538104991796"; // pruebas de Eiscue
const ibai = "UCaY_-ksFSQtTGk0y1HA_3YQ"; const paolo = "UCixD9UbKvDxzGNiPC_fgHyA"; const teloresumo= "UCw7Bz6EHxlnOoBUBlJZCWCw"; const yuste = "UCg3tcZFxjCGe30QurC77Fnw";

setInterval(async function(){ //Paolo From TOKYO
  const videosP = await getChannelVideos(paolo,0); const ultimoVideoP = videosP.items[0]; const tituloP = await yt.obtener("PaoloFromTokyo");
  if (tituloP === ultimoVideoP.title ) return;
  if (tituloP !== ultimoVideoP.title ) { yt.establecer("PaoloFromTokyo", ultimoVideoP.title);
    client.channels.cache.get(canalPruebas).send(`${ultimoVideoP.author} subio un video: **${ultimoVideoP.title}**\nhttps://youtube.com/watch?v=${ultimoVideoP.videoId}`);
  }
}, 120000);

setInterval(async function(){ //Te lo resumo
  const videosT = await getChannelVideos(teloresumo,0); const ultimoVideoT = videosT.items[0]; const tituloT = await yt.obtener("Teloresumo");
  if (tituloT === ultimoVideoT.title ) return;
  if (tituloT !== ultimoVideoT.title ) { yt.establecer("Teloresumo", ultimoVideoT.title);
    client.channels.cache.get(canalPruebas).send(`${ultimoVideoT.author} subio un video: **${ultimoVideoT.title}**\nhttps://youtube.com/watch?v=${ultimoVideoT.videoId}`);
  }
}, 120000);

client.on("messageCreate", async (message) => {

  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client.comandos.get(command) //|| client.comandos.find((c) => c.alias.includes(command))
  if (cmd){
    return cmd.run(client,message, args)
  }

  if (message.content.startsWith("ping")) { message.channel.send("pong!"); }

  if (message.content.startsWith("p")) {
    const userSchema = require("./modelos/ytSchema.js")
    let res = message.content.slice(2);
    let data = await userSchema.findOne({name: res})
    if (!data){
        let newdata = new userSchema({name: res})
        return await newdata.save()
    }
    await userSchema.findOneAndUpdate({name:res})
  }

  if(message.content.startsWith("p1")){
    const YouTubeSchema = require("./modelos/YouTubeSchema.js")
    let name ="zwag"; let url="www.youtube.com";
    let data = await YouTubeSchema.findOne({name: name})
    console.log(data)
    console.log(data.name)
    if(!data){
        let newdata = new YouTubeSchema({name: name, url: url})
        return await newdata.save()
    }
    await YouTubeSchema.findOneAndUpdate({name: name, url:url})
  }

  if(message.content.startsWith("p1")){

  }


});
keepAlive();
client.login(process.env.DISCORD_BOT_SECRET);