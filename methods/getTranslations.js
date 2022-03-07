const { parsing } = require("./parsing");

function getTranslations(ctx) {
  var suraId = ctx.match[1];
  var suralar = parsing();
  var sura = suralar.find((item) => item.id === suraId);
  if (ctx.match[0].slice(0, -2) === "tarjimalar") {
    return ctx.editMessageText(`Tarjimalar \n`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Ingliz tili", callback_data: `language_3${sura.id}` }],
          [
            { text: "O'zbek tili", callback_data: `language_1${sura.id}` },
            { text: "Rus tili", callback_data: `language_2${sura.id}` },
          ],
          [{ text: "Orqaga", callback_data: `sura_${sura.id}` }],
        ],
      },
    });
  }
}

module.exports = { getTranslations };
