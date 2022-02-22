const { Telegraf } = require("telegraf");
const Markup = require("telegraf/markup");
const fs = require("fs");


const bot = new Telegraf("5150821600:AAGCWvc2DYp86q9idOSSh2t7P651EoAWMvg");

bot.start((ctx) => {
  ctx.reply(
    "Menu",
    Markup.keyboard(["Suralar", "Sozlamalar", "Yordam"])
      .oneTime()
      .resize()
      .extra()
  );
});
bot.on("text", (ctx) => {
  if (ctx.message.text === "Suralar") {
    ctx.reply(
      "Suralar bo'limi.",
      Markup.keyboard(["Falaq", "Nas"]).oneTime().resize().extra()
    );
  } else {
    let fileSuralar = fs.readFileSync("suralar.json", "utf-8");
    let suralar = JSON.parse(fileSuralar);
    let sura = suralar.find((item) => item.title === ctx.message.text);
    if (sura) {
      ctx.reply(`${sura.title} surasi \n ${sura.content}`);
    } else {
      ctx.reply("Kechirasiz bizda bunday nomli sura mavjud emas.");
    }
  }
});

// function sura(name) {}

// const axios = require("axios");

// const helpMessage = `
// /fortune - get a fortune cookie;
// /cat - get a random cat picture;
// /cat <text> - get a random cat pic with your text and nicename;

// /dogbreeds - get a dogbreeds list;

// /dog <text from dogbreeds list> - get a dog pic and text of dogbreeds list text;
// `;
// startCommand = `
// /help - get what will do bot for you.
// `;

// bot.start((ctx) => {
//   ctx.reply(`Hi ${ctx.from.first_name} \n${startCommand}`);
// });
// bot.help((ctx) => {
//   ctx.reply(helpMessage);
// });

// bot.command("fortune", (ctx) => {
//   axios
//     .get("http://yerkee.com/api/fortune")
//     .then((res) => {
//       ctx.reply(res.data.fortune);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });
// bot.command("cat", (ctx) => {
//   input = ctx.message.text;

//   inputArray = input.split(" ");
//   if (inputArray.length == 1) {
//     try {
//       axios.get("https://aws.random.cat/meow").then((res) => {
//         ctx.replyWithPhoto(res.data.file);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     inputArray.shift();
//     input = inputArray.join(" ");
//     ctx.replyWithPhoto(
//       `https://cataas.com/cat/says/${input} ${ctx.from.first_name}`
//     );
//   }
// });
// bot.command("dogbreeds", (ctx) => {
//   let rawData = fs.readFileSync("./dogbreeds.json", "utf-8");
//   let data = JSON.parse(rawData);
//   let message = "Dog Breed";
//   data.forEach((item) => {
//     message += `-${item}\n`;
//   });
//   ctx.reply(message);
// });

// bot.command("dog", (ctx) => {
//   let input = ctx.message.text.split(" ");
//   if (input.length != 2) {
//     ctx.reply("YOU must give a dog breed as second argument!");
//     return;
//   }
//   let breedInput = input[1];
//   let rawData = fs.readFileSync("./dogbreeds.json", "utf-8");
//   let data = JSON.parse(rawData);

//   if (data.includes(breedInput)) {
//     axios
//       .get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
//       .then((res) => {
//         ctx.replyWithPhoto(res.data.message);
//         ctx.reply(`I'm ${breedInput.toUpperCase()}!`);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   } else {
//     let suggestions = data.filter((item) => {
//       return item.startsWith(breedInput);
//     });
//     let message = "Did you mean: \n";

//     suggestions.forEach((item) => {
//       return (message += `-${item}\n`);
//     });
//     if (suggestions.length == 0) {
//       ctx.reply("Empty question!");
//     } else {
//       ctx.reply(message);
//     }
//   }
// });

bot.launch();
