
const fs = require("fs");
const { alea } = require("seedrandom");
const events = JSON.parse(fs.readFileSync("./data/idle_events.json"));
const listsize = 8;

const index = [];
for (let i = 0; i < events.length; i++) { index.push(i) };

module.exports = function(name) {

  // shuffle events
  let arng = new alea(name);
  let list = Array.from(index);
  for (let i = list.length; i > 0; i--) {
    let r = Math.floor(arng()*i);
    let _ = list[i-1];
    list[i-1] = list[r];
    list[r] = _;
  }

  // Take the first 8 events, each of them has 1/4 chance of happening.

  for (let i = 0; i < 8; i++) {
    if (Math.random() < 0.25) {
      return events[list[i]].replace("$NAME",name);
    }
  }

  return events[0].replace("$NAME",name);

}
