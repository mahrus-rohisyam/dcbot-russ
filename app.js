const { Client, Intents, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const path = require("path");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

// Folder and File Handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name , command);
  console.log(command.data.name)
}

// Command Handler
client.on("interactionCreate", async (interact) => {
  if (!interact.isCommand()) return;

  const command = client.commands.get(interact.commandName);

  if (!command) return;

  try {
    await command.execute(interact);
  } catch (error) {
    console.error(error);
    await interact.reply({ content: "There was and error" });
  }
});

//Running Process
client.once("ready", () => {
  console.info("Russbot is active");
});
client.login(token);
