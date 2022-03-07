const { Telegraf } = require("telegraf");
const { getAlphabet } = require("./actions/getAlphabet");
const { getAudio } = require("./actions/getAudio");
const { getLanguage } = require("./actions/getLanguage");
const { getSuralar } = require("./actions/getSuralar");
const { getSuraText } = require("./actions/getSuraText");
const { getTranslations } = require("./methods/getTranslations");
const { getVideo } = require("./actions/getVideo");
const { sendMain } = require("./actions/sendMain");

const bot = new Telegraf("5150821600:AAGCWvc2DYp86q9idOSSh2t7P651EoAWMvg");

bot
  .start((ctx) => {
    return sendMain(ctx);
  })
  .action("Suralar", getSuralar)
  .action("Bosh sahifa", sendMain)
  .action(/^sura_(\d+)/, getSuraText)
  .action(/^audio_(\d+)/, getAudio)
  .action(/^video_(\d+)/, getVideo)
  .action(/^alphabet_(\d+)/, getAlphabet)
  .action(/^language_(\d+)/, getLanguage)
  .action(/^tarjimalar_(\d+)/, getTranslations);
bot.launch();
