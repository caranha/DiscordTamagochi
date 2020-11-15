const fs = require("fs");
var server_config = {}

try {
  if (fs.existsSync("./server_config.json")) {
    server_config = JSON.parse(fs.readFileSync("./server_config.json"));
  } else {
    save();
  }
} catch(err) {
  console.error(err)
}

function save() {
  fs.writeFileSync("server_config.json", JSON.stringify(server_config));
}

module.exports = {
  server_config,
  save,
}
