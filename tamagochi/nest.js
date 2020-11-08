// Nest manages the eggs
const fs = require('fs');
const egg = require('../tamagochi/egg.js');
const savefile = "tamagochi/nest.json"
const { tick_time } = require("../config.json")
var nest = {};

// Initialize nest file
try {
  if (fs.existsSync(savefile)) {
    n = JSON.parse(fs.readFileSync(savefile));
    for (owner in n) {
      _egg = egg.egg.fromJSON(n[owner]);
      nest[owner] = _egg;
    }
  } else {
    save();
  }
} catch(err) {
  console.error(err)
}

// Initialize Egg update
const _eggupdate = setInterval(
  egg_update,
  tick_time * 1000
)

module.exports = {
  clear,
  create,
  egg_update,
  get,
  update,
}

// Update all eggs
function egg_update() {
  let _before = Date.now()
  for (owner in nest) {
    nest[owner].update();
  }
  save();
  let _after = Date.now()
  console.log(`Eggs updated in ${_after - _before} milliseconds.`);
}

// Get the egg of an user
function get(user) {
  return nest[user];
}

// Remove the egg of an user
function clear(user) {
  delete nest[user];
  save();
}

// Create a new egg for an user
function create(user) {
  let newegg = new egg.egg(user);
  update(user.id, newegg);
}

// save a modified egg for an user
function update(user, egg) {
  nest[user] = egg;
  save();
}

// save the eggs
function save() {
  fs.writeFileSync(savefile, JSON.stringify(nest), function(err) {
    if (err) {
        console.log(err);
    }
  });
}
