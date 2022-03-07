const { parsing } = require("./parsing");

function getFiveButtons() {
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
}

module.exports = { getFiveButtons };
