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
  const btns = [];
  for (let i = 0; i < suralar.length; i = i + 5) {
    const oneLineBtn = [];
    for (let j = i; j < i + 5; j++) {
      if (suralar[j]) {
        oneLineBtn.push({
          text: suralar[j].id,
          callback_data: `sura_${suralar[j].id}`,
        });
      }
    }
    btns.push(oneLineBtn);
  }
  return btns;
};
const ListSuralar = () => {
  var suralar = parsing();
  return suralar.reduce((pv, cv) => {
    return pv + `${cv.id}. ${cv.title}\n`;
  }, "");
};

bot
  .start((ctx) => {
    sendMain(ctx);
  })
  .action("Suralar", (ctx) => {
    if (ctx.match === "Suralar") {
      return ctx.editMessageText(`\nSuralar bo'limi\n\n${ListSuralar()}`, {
        reply_markup: {
          inline_keyboard: [
            ...getButtons(),
            [{ text: "Bosh sahifa", callback_data: "Bosh sahifa" }],
          ],
        },
      });
    }
  })
  .action("Bosh sahifa", (ctx) => {
    return sendMain(ctx);
  })
  .action(/^sura_(\d+)/, (ctx) => {
    const suraId = ctx.match[1];
    let suralar = parsing();
    let sura = suralar.find((item) => item.id == suraId);
    if (sura) {
      ctx.editMessageText(`${sura.title} surasi \n ${sura.content}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Audio", callback_data: `audio_${sura.id}` },
              { text: "Video", callback_data: `video_${sura.id}` },
              { text: "Orqaga", callback_data: "Suralar" },
            ],
          ],
        },
      });
    } else {
      ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
    }
  })
  .action(/^audio_(\d+)/, (ctx) => {
    const suraId = ctx.match[1];
    suralarAudios = parsingAudios();
    var sura = suralarAudios.find((audio) => audio.id == suraId);
    if (sura) {
      return ctx.editMessageText(
        `${sura.title} surasi \n`,
        ctx.replyWithAudio(sura.link),
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Orqaga", callback_data: `sura_${sura.id}` }],
            ],
          },
        }
      );
    } else {
      ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
    }
  })
  .action(/^video_(\d+)/, (ctx) => {
    const suraId = ctx.match[1];
    suralarVideos = parsingVideos();
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
        ctx.reply(sura.link)
      );
    } else {
      ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
    }
  });

function parsing() {
  let fileSuralar = fs.readFileSync("suralar.json", "utf-8");
  return (suralar = JSON.parse(fileSuralar));
}
function parsingAudios() {
  let fileSuralar = fs.readFileSync("suralar-audios.json", "utf-8");
  return (suralar = JSON.parse(fileSuralar));
}

function parsingVideos() {
  let fileSuralar = fs.readFileSync("suralar-videos.json", "utf-8");
  return (suralar = JSON.parse(fileSuralar));
}

bot.launch();
