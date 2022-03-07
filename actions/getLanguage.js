const { parsing } = require("../methods/parsing");

function getLanguage(ctx) {
  const suraId = ctx.match[1].slice(1);
  suraLanguage = parsing();
  var sura = suraLanguage.find((sura) => sura.id === suraId);
  var language = ctx.match[0].slice(0, -1);
  for (let [key, value] of Object.entries(sura)) {
    if (key === language) {
      language = value;
    }
  }
  if (sura) {
    ctx.reply(language);
    return ctx.editMessageText(`${sura.title} surasi \n`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Orqaga", callback_data: `tarjimalar_${sura.id}` }],
        ],
      },
    });
  } else {
    ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
  }
}

module.exports = { getLanguage };
