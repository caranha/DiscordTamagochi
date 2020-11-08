var assert = require('assert');

// Loading commands
var nest = require("../tamagochi/nest.js");
var ask = require("../commands/ask.js");
var name = require("../commands/name.js");
var inspect = require("../commands/inspect.js");



// Not working -- fix it

// let user = "test-user"
// let result = false
//
// nest.clear(user)
//
// result = inspect.act(user, "");
// assert (result[0] == false, "Inspecting an egg that should not exist");
//
// result = name.act(user, "name");
// assert (result[0] == false, "Naming an egg that should not exist");
//
// result = ask.act(user, ""); // creating a new egg
// assert (result[0] == true, "Adding an egg for a new user");
//
// result = ask.act(user, "");
// assert (result[0] == false, "Failing to add an egg for an existing user");
//
// result = inspect.act(user, "");
// assert (result[0] == true, "Inspecting an existing egg");
//
// nest.clear(user)
