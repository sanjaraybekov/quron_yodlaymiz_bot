const { parsing } = require("./parsing");

function ListSuralar() {
  var suralar = parsing();
  return suralar.reduce((pv, cv) => {
    return pv + `${cv.id}. ${cv.title}\n`;
  }, "");
}
module.exports = { ListSuralar };
