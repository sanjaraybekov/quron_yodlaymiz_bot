const { parsing } = require("../methods/parsing");

function getSuraText(ctx) {
  const suraId = ctx.match[1];
  let suralar = parsing();
  let sura = suralar.find((item) => item.id === suraId);
  if (sura) {
    ctx.editMessageText(`${sura.title} surasi \n ${sura.alphabet_2}`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Audio", callback_data: `audio_${sura.id}` },
            { text: "Video", callback_data: `video_${sura.id}` },
          ],
          [
            { text: "Arabcha", callback_data: `alphabet_1${sura.id}` },
            { text: "Kirilcha", callback_data: `alphabet_3${sura.id}` },
            { text: "Tarjima", callback_data: `tarjimalar_${sura.id}` },
          ],
          [{ text: "Orqaga", callback_data: "Suralar" }],
        ],
      },
    });
  } else {
    ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
  }
}

module.exports = { getSuraText };
