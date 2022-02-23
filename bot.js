const { Telegraf } = require("telegraf");
const fs = require("fs");

const bot = new Telegraf("5150821600:AAGCWvc2DYp86q9idOSSh2t7P651EoAWMvg");

const sendMain = (ctx) => {
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
};
const getButtons = () => {
  var suralar = parsing();
  return suralar.map((s) => {
    return { text: s.title, callback_data: `sura_${s.id}` };
  });
};
bot
  .start((ctx) => {
    sendMain(ctx);
  })
  .action("Suralar", (ctx) => {
    if (ctx.match === "Suralar") {
      return ctx.editMessageText(`\nSuralar bo'limi\n`, {
        reply_markup: {
          inline_keyboard: [
            getButtons(),
            [{ text: "Bosh sahifa", callback_data: "Bosh sahifa" }],
          ],
        },
      });
    }
  })
  .action("Bosh sahifa", (ctx) => {
    return sendMain(ctx);
  })
  .action(/^sura_(\d)/, (ctx) => {
    const suraId = ctx.match[1];
    let suralar = parsing();
    let sura = suralar.find((item) => item.id == suraId);
    if (sura) {
      ctx.editMessageText(`${sura.title} surasi \n ${sura.content}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Audio", callback_data: "Audio" },
              { text: "Video", callback_data: "Video" },
              { text: "Orqaga", callback_data: "Suralar" },
            ],
          ],
        },
      });
    } else {
      ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
    }
  });

function parsing() {
  let fileSuralar = fs.readFileSync("suralar.json", "utf-8");
  return (suralar = JSON.parse(fileSuralar));
}
bot.launch();
