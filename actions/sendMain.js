const { Telegraf } = require("telegraf");

const bot = new Telegraf("5150821600:AAGCWvc2DYp86q9idOSSh2t7P651EoAWMvg");

function sendMain(ctx) {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Assalomu Aleykum ${ctx.from.first_name}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Suralar", callback_data: "Suralar" },
            { text: "Yordam", callback_data: "Yordam" },
            { text: "Sozlamalar", callback_data: "Sozlamalar" },
          ],
        ],
      },
    }
  );
}
module.exports = { sendMain };
