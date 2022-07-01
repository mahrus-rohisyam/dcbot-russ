const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    let ping = Date.now() - interaction.createdTimestamp * -1
    return interaction.reply(
      `Pong!  **\`${ping.toString().slice(0, 2)}ms\`**`
    );
  },
};
