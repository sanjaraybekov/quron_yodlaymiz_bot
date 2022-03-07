const fs = require("fs");

function parsing() {
  let fileSuralar = fs.readFileSync("suralar.json", "utf-8");
  return (suralar = JSON.parse(fileSuralar));
}
module.exports = { parsing };
