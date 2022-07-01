const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    let ping = Date.now() - interaction.createdTimestamp
    return interaction.reply(
      `Pong!  **\`${Math.round(ping * -1)}ms\`**`
    );
  },
};
