var fs = require('fs');

var savefile = "memory.json";
var memory = {};

data = fs.readFileSync(savefile);
memory = JSON.parse(data);

function save() {
  fs.writeFile(savefile, JSON.stringify(memory), function(err) {
      if (err) {
          console.log(err);
      }
  });
  console.log("Saved Memory");
}

module.exports = {
  memory: memory,
  save: save,
}
