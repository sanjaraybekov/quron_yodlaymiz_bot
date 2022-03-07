const { parsing } = require("../methods/parsing");

function getVideo(ctx) {
  const suraId = ctx.match[1];
  suralarVideos = parsing();
  var sura = suralarVideos.find((video) => video.id == suraId);
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
      ctx.reply(sura.video_link)
    );
  } else {
    ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
  }
}

module.exports = { getVideo };
