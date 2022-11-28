const { DisTube, Song } = require('distube')
const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs')

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const queue = new Map();

const client = new Client({ intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
        ],

    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ]});

client.distube = new DisTube(client, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
})



let currentSong = ""
let playing = true

async function playSong(songURL){  
    
    const channel = await client.channels.cache.get("1045781216080707594")
    const textChannel = await client.channels.cache.get("957553977896095764")
    const member = await channel.guild.members.cache.get("826004037043617803")
    const message = await textChannel.send(`message`)
    if(songURL == "toggleStop"){
        if(playing == true){
            client.distube.stop(message)
            textChannel.send("STOPPED SONG")
            playing = false
        }
        else{
            client.distube.resume(message)
            textChannel.send("STARTED SONG")
            playing = true
        }
    }
    client.distube.play(channel, songURL, {
        member,
        textChannel,
        message,
    })
    try{
    client.distube.skip(message);
    }catch(err){}
    client.distube.on("playSong", (queue, song) => {
        textChannel.send("Now playing: "+ song.name)
    })
}

client.on('ready', async client=> {
    console.log("Client is ready")

    const id = setInterval(async () => {

        fs.readFile('songs.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            if(currentSong != data){
                playSong(data)
            }
            currentSong = data

          });

    }, 4000);

})





client.login(process.env.DISCORD_TOKEN);