/* --------------------------------- Config --------------------------------- */
const Discord = require("discord.js");
const generateImage = require("./src/generateImage");
require("dotenv").config();

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

/* -------------------------------- Variables ------------------------------- */
const ch_welcome = "856224425590652961";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

/* ------------------------------- New Member ------------------------------- */
client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache
    .get(ch_welcome)
    .send({
      content: `
        <@${member.id}> Welcome to server !
        You are #${member.guild.memberCount}
      `,
      file: [img]
    })
});

client.on("message", async message => {
  message.content.startsWith("!ping") && message.channel.send(`Pong ${client.ws.ping}ms`)
})


/* ----------------------------- Running Process ---------------------------- */
client.login(process.env.TOKEN);
