const { getFiveButtons } = require("../methods/getFiveButtons");
const { ListSuralar } = require("../methods/getSuralarList");

function getSuralar(ctx) {
  if (ctx.match === "Suralar") {
    return ctx.editMessageText(`\nSuralar bo'limi\n\n${ListSuralar()}`, {
      reply_markup: {
        inline_keyboard: [
          ...getFiveButtons(),
          [{ text: "Bosh sahifa", callback_data: "Bosh sahifa" }],
        ],
      },
    });
  }
}

module.exports = { getSuralar };
