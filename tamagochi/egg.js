// Class that defines a tamagochi

// Requires
const fs = require("fs");

const interval_string = require("../utils/interval_string.js");
const choice = require("../utils/choice_array.js");
const foodtaste = require("../utils/foodtaste.js");
const idle_event = require("../tamagochi/idle_event.js");

const random_names = JSON.parse(fs.readFileSync("./data/names.json"));
const random_desc = JSON.parse(fs.readFileSync("./data/description.json"));

// Constants
const max_food = 24;
const max_energy = 24;
const max_happiness = 30;
const min_happiness = -30;
const max_health = 30;
const min_health = -30;


let egg = class {
  constructor(mom) {
    // basics
    this._name = this._create_random_name();
    if (typeof mom != "undefined") {
      this._mom_username = mom.username;
      this._mom_id = mom.id;
    }
    this._age = 0;
    this._lastpet = -1;
    this._desc = this._create_random_description();

    // history
    this._history = [];

    // status
    this._fullness = max_food;
    this._eat_rate = .9;

    this._asleep = false;
    this._energy = max_energy;

    this._happiness = 0;
    this._health = 0;

    // items
    this._food = [];
  }

  static fromJSON(json) {
    let ret = new egg();

    for (let key in json) {
      ret[key] = json[key];
    }

    return ret;
  }

  describe() {
    let _ret = "";

    // part 1, basic description
    _ret += `This is ${this._mom_username}'s egg, ${this._name}.`;
    _ret += `\n${this._desc}`

    // part 2, status
    let status = "";

    if (this._asleep) {
      status += `\n${this._name} is sleeping now.`;
    } else {
      // hunger
      if (max_food / 5 < this._fullness && this._fullness < (max_food / 2)) {
        status += `\n${this._name} has a hungry look in their face.`;
      } else if (this._fullness <= max_food / 5) {
        status += `\n${this._name} looks starved, they are searching for food.`;
      }

      // sickness and happiness
      if (this._health < min_health * (2/3)) {
        status += `\nThey are looking really weak and sick. You should give them medicine!`;
      } else if (this._health < min_health * (1/3)) {
        status += `\nThey are shivering and sneezing. Better make sure they are well fed!`;
      } else if (this._happiness < min_happiness * (1/2)) {
        status += `\nThey have a sad and gloomy look in their face.`;
      } else if (this._happiness > max_happiness * (1/2)) {
        status += `\nThey look happy!`;
      }

    }

    if (status == "") { status = `\n${this._name} looks okay.`}
    _ret += status;

    // part 3, what happened recently
    _ret += this._get_history_string(1);

    return _ret;
  }

  update() {
    this._age += 1;
    let activity = false;
    // Become hungry
    if (Math.random() < this._eat_rate) { this._fullness = Math.max(0, this._fullness - 1)}

    // If there is food available, eat.
    if (!this._asleep && this._food.length > 0 && Math.random() > (this._fullness / max_food)) {
      let snack = this._food.pop();
      let message = "";

      if (this._fullness > 18) {
        message = `${this._name} ate some ${snack}, even though they were not very hungry.`;
      } else if (this._fullness > 12) {
        message = `${this._name} felt peckish and snacked on some ${snack}.`;
      } else {
        message = `${this._name} ate some ${snack}.`;
      }

      // Food taste
      let favorite = foodtaste(this._name,snack);
      switch(favorite) {
        case 0:
          message += " They didn't like it.";
          this._happiness -= 4;
          break;
        case 1:
          message += " They seemed to like it."
          this._happiness += 1;
          break;
        case 2:
          message += " They really liked it!"
          this._happiness += 2;
          break;
      }

      this.add_history(message);
      this._fullness = Math.min(max_food, this._fullness + (max_food / 2));

      activity = true;
    }

    // Sleep Cycle -- sleep if energy <= 8, wake up if energy >= 24
    if (this._asleep){
      this._energy += 2;
      if (this._energy >= max_energy) {
        this._energy = max_energy
        this._asleep = false;
      }
    } else {
      this._energy -= 1;
      if (this._energy < 9) { this._asleep = true };
    }

    // Update Health
    if (this._asleep) {
      if (this._fullness > max_food * (4/5)) { this._health += 1; }
      if (this._fullness < max_food * (1/4)) { this._health -= 1; }
      if (this._fullness == 0) { this._health -= 1; }
    }

    if (Math.random() < ((1/24) * (1/5))) {
      this._health -= 20;
      console.log(`${this._name} got a cold.`);
    }

    this._health = Math.max(this._health, min_health);
    this._health = Math.min(this._health, max_health);

    // Update Happiness
    if (!this._asleep) {
      if (this._fullness < max_food * (1/4)) { this._happiness -= 1; }
      if (this._health < min_health * (1/3)) { this._happiness -= 1; }
      if (this._health < min_health * (2/3)) { this._happiness -= 1; }
    }

    this._happiness = Math.max(this._happiness, min_happiness);
    this._happiness = Math.min(this._happiness, max_happiness);

    console.log(`Egg ${this._name} updated.`);
    console.log(`    Asleep: ${this._asleep}, Energy: ${this._energy}`);
    console.log(`    Hunger: ${this._fullness}, Food Bowl: ${this._food}`);
    console.log(`    Happiness: ${this._happiness}, Health: ${this._health}`);
    //this.add_history("update");

    // Activities:
    // If the egg is sick, it cancel other activities.
    if (this._health < min_health * (1/3)) {
      if (Math.random() < 1/12) { this.add_history(`${this._name} stays in their bed, shivering...`); }
      activity = true;
    }

    // If there is no activity, and the egg is not sleeping, try to do an activity
    if (!this._asleep && !activity && Math.random() < 1/3) {
      this.add_history(idle_event(this._name));
    }
  }

  give_medicine() {
    let ret = "Something is wrong";

    if (this._asleep) {
      this._asleep = false;
      this._happiness -= 4;
      ret = `You wake up ${this._name} to give them some medicine. They seem annoyed, but you know they need this.`;
    } else {
      ret = `You give ${this._name} some medicine. They hate the taste...`
    }

    this._happiness -= 10;
    this._health += 20;

    this._health = Math.max(this._health, min_health);
    this._health = Math.min(this._health, max_health);
    this._happiness = Math.max(this._happiness, min_happiness);
    this._happiness = Math.min(this._happiness, max_happiness);

    return ret;
  }

  pet() {
    if (this._lastpet == this._age) {
      return `You pet ${this._name} a little bit more. They are so fluffy!`
    } else {
      this._lastpet = this._age;

      if (this._health < min_health * 1/3) {
        this._happiness += 4;
        return `Poor ${this._name} looks sick. You pet and comfort them for a while. Hang in there, ${this._name}!`
      } else if (this._happiness < min_happiness * 1/3) {
        this._happiness += 6;
        return `${this._name} seems so sad... you spend some time petting them, and that seems to cheer them up!`
      } else {
        this._happiness += 2;
        return `You give ${this._name} some pats on their head. They giggle in happiness`;
      }

    }
  }

  feed(foodname) {
    let ret = "Something is wrong";

    if (this._asleep) {
      ret = `${this._name} is asleep, so you leave some ${foodname} for them to eat later.`;
      this._food.push(foodname);
      ret += `\nThey now have ${this._food.join(", ")} in their cupboard.`;
    } else {
      if (Math.random() > (this._fullness / max_food)) {
        ret = `${this._name} takes the food happily from your hands and munch it down.`;
        this._fullness = Math.min(max_food, this._fullness + (max_food / 2));
        let favorite = foodtaste(this._name,foodname);
        switch(favorite) {
          case 0:
            ret += ` They do a takeback and cough a little. It seems that they don't like ${foodname}.`;
            this._happiness -= 4;
            break;
          case 1:
            ret += ` They sit back and pat their belly. Looks like they really like ${foodname}!`;
            this._happiness += 2;
            break;
          case 2:
            ret += ` Their eyes shine as they eat ${foodname}. Maybe it is ${this._name}'s favorite food?`;
            this._happiness += 4;
            break;
        }

      } else {
        ret = `${this._name} does not seem interested in that right now. You put it in their cupboard, maybe they'll eat it later.`;
        this._food.push(foodname);
        ret += `\nThe cupboard now has ${this._food.join(", ")}.`;
      }
    }

    return ret;

  }

  add_history(message) {
    this._history.push({"timestamp": Date.now(), "message": message})
  }

  _get_history_string(length) {
    // lazy initialization of history array;
    if (typeof this._history == "undefined") { this._history = [] }

    if (this._history.length > 0) {
      let ret = `\n\nLast activity `;
      let hist = [];

      for (let i = 0; i < Math.min(length, this._history.length); i++) {

        let _h = this._history[this._history.length - (1+i)];
        let interval = interval_string(Date.now() - _h.timestamp);
        hist.push(`(${interval} ago): ${_h.message}`);
      }
      return ret + hist.join("\n");
    } else {
      return "";
    }
  }


  _create_random_description () {
    let ret = `They are a ${choice(random_desc.body_adjective)} ${choice(random_desc.color)} egg,`;
    ret += ` with ${choice(random_desc.hair_adjective)} ${choice(random_desc.color)} hair`;
    ret += ` and ${choice(random_desc.eye_adjective)} ${choice(random_desc.color)} eyes.`;
    ret += ` They have ${choice(random_desc.special_thing)}.`;

    return ret;
  }

  _create_random_name() {
    return choice(random_names);
  }


}

module.exports = {
  egg,
}
