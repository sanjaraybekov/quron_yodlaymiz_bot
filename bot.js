const {Telegraf}=require("telegraf");


const bot =new Telegraf("5259679287:AAELWsIupsDZOOP7XVDeCpidEDUO0NhGvcc");

bot.start((ctx)=>ctx.reply("Welcome!"));

bot.help((ctx)=>ctx.reply("What?"));

bot.settings((ctx)=>ctx.reply("You entered settings."))

bot.launch();