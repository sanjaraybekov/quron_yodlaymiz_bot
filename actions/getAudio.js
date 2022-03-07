const { parsing } = require("../methods/parsing");

function getAudio(ctx) {
  const suraId = ctx.match[1];
  suralarAudios = parsing();
  var sura = suralarAudios.find((audio) => audio.id == suraId);
  if (sura) {
    return ctx.editMessageText(
      `${sura.title} surasi \n`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Orqaga", callback_data: `sura_${sura.id}` }],
          ],
        },
      },
      ctx.replyWithAudio(sura.audio_link)
    );
  } else {
    ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
  }
}

module.exports = { getAudio };
