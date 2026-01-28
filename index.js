console.clear();
console.log(`
███████╗██╗  ██╗ ██╗██████╗ ██╗   ██╗███████╗
██╔════╝╚██╗██╔╝███║██╔══██╗██║   ██║╚══███╔╝
█████╗   ╚███╔╝ ╚██║██║  ██║██║   ██║  ███╔╝ 
██╔══╝   ██╔██╗  ██║██║  ██║██║   ██║ ███╔╝  
███████╗██╔╝ ██╗ ██║██████╔╝╚██████╔╝███████╗
╚══════╝╚═╝  ╚═╝ ╚═╝╚═════╝  ╚═════╝ ╚══════╝

        EX1DUZ ROLE NUKER
        Made by EX1DUZ
`);

require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: "❌ Admin only.", ephemeral: true });
  }

  const guild = interaction.guild;
  const bot = await guild.members.fetchMe();
  const botTop = bot.roles.highest.position;
  const roles = await guild.roles.fetch();

  let deletable = 0;
  let managed = 0;
  let higher = 0;

  for (const role of roles.values()) {
    if (role.name === "@everyone") continue;
    if (role.managed) managed++;
    else if (role.position >= botTop) higher++;
    else deletable++;
  }

  /* 🧪 CHECK ROLES */
  if (interaction.commandName === "checkroles") {
    const embed = new EmbedBuilder()
      .setTitle("🧪 Role Diagnostic")
      .setColor(0x2ecc71)
      .addFields(
        { name: "🟢 Deletable", value: `${deletable}`, inline: true },
        { name: "🔒 Managed", value: `${managed}`, inline: true },
        { name: "⬆️ Higher than bot", value: `${higher}`, inline: true },
        { name: "🤖 Bot Top Role Position", value: `${botTop}`, inline: false }
      )
      .setFooter({ text: "Only you can see this" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  /* 🗑 DELETE ROLES */
  if (interaction.commandName === "deleteroles") {
    if (deletable === 0) {
      const embed = new EmbedBuilder()
        .setTitle("❌ No Roles Deleted")
        .setColor(0xe74c3c)
        .setDescription("Discord blocked all role deletions.")
        .addFields(
          { name: "Managed", value: `${managed}`, inline: true },
          { name: "Higher than bot", value: `${higher}`, inline: true }
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    let deleted = 0;
    let skipped = 0;

    const progressEmbed = new EmbedBuilder()
      .setTitle("🗑 Deleting Roles...")
      .setColor(0xf1c40f)
      .setDescription(`Progress: **0 / ${deletable}**`)
      .setTimestamp();

    await interaction.editReply({ embeds: [progressEmbed] });

    for (const role of roles.values()) {
      if (
        role.name === "@everyone" ||
        role.managed ||
        role.position >= botTop
      ) {
        skipped++;
        continue;
      }

      try {
        await role.delete("Bulk role deletion");
        deleted++;
      } catch {
        skipped++;
      }

      progressEmbed.setDescription(
        `Progress: **${deleted} / ${deletable}**`
      );

      await interaction.editReply({ embeds: [progressEmbed] });
      await new Promise(r => setTimeout(r, 300));
    }

    const doneEmbed = new EmbedBuilder()
      .setTitle("✅ Role Deletion Complete")
      .setColor(0x3498db)
      .addFields(
        { name: "🗑 Deleted", value: `${deleted}`, inline: true },
        { name: "⏭ Skipped", value: `${skipped}`, inline: true }
      )
      .setFooter({ text: "Operation finished successfully" })
      .setTimestamp();

    return interaction.editReply({ embeds: [doneEmbed] });
  }
});

client.login(process.env.BOT_TOKEN);
