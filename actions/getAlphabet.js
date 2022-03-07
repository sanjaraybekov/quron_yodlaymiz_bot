const { parsing } = require("../methods/parsing");

function getAlphabet(ctx) {
  const suraId = ctx.match[1].slice(1);
  suralarAlphabet = parsing();
  var sura = suralarAlphabet.find((sura) => sura.id === suraId);
  var alphabet = ctx.match[0].slice(0, -1);
  for (let [key, value] of Object.entries(sura)) {
    if (key === alphabet) {
      alphabet = value;
    }
  }
  if (sura) {
    ctx.reply(alphabet);
    return ctx.editMessageText(`${sura.title} surasi \n`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Orqaga", callback_data: `sura_${sura.id}` }],
        ],
      },
    });
  } else {
    ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
  }
}

module.exports = { getAlphabet };
