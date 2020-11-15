# Tasklist

# Fixlist
- [X] Add a reaction every time the bot understands a command
- [X] "Nothing here yet" reply on empty !log
- [X] Make it clearer how to use the "name" option

- [X] Allow server to configure which channels the bot listen to
- [X] !channel -- allow server mods to change the channel the bot is listening to
- [X] Break help into classifications
- [X] Hidden command !eat
- [X] Random pet messages

- [ ] Rock paper scissors
- [ ] Separate !feed and !cupboard
- [ ] Scale hunger: Hunger levels -- full, ok, hungry, starving
- [ ] Change probability of eating based on hungry levels: 100% when hungry/starving

- [ ] accumulative commands: !eat checks if the pet ate recently and makes a picnic, !feed checks if the player ate recently and makes a picnic.

- [ ] Bug reaction that marks a message as a typo
- [ ] Report reaction that immediately delete and logs the message

- [ ] Catch EAI errors (bot can't reach discord)
- [ ] "TODO reminder" command; "Suggestion" command;

- [ ] Allows user to set personal prefix
- [ ] Allows server to override global prefix (function "getprefix")

- [ ] identify just the first few letters of a command (ex: ch for check) -- to do this, I should do a prefix search of the first token on the set of commands

- [ ] Improve information on check: Status, Description, Activity, Items

- [ ] Princess maker update
- [ ] Future: Attributes: Smarts, Atletics, changed by Activities
- [ ] Future: Long term activities

- [ ] Memories: list of activities the tamagochi does most often

# Ideas

## Improve petting
- Randomize initial message from petting
- Special petting message when sleeping

## Picnic:
- When you eat at the same time that your pet is eating, you have a picnic.
- When you eat, register the time that you ate.
- When your pet eats, register the time that the pet eats.
- If the times are the same, and you used a !eat or !feed command, have a picnic
  - picnic increases happiness.

## Alarm:
- Pet send a direct message if they want something.
- Direct message is limited to 1 every day.
- Player can "configplayer" to set the message limit.
- Player can scold the pet, if the message is not appropriate.

## Admin
- Player can delete their pet.
- Player can set personal prefix.

## Medicine
- nerf medicine, so you can't just give it over and over again.


## Aging and size
- Life stages: Young, Adult, Elderly
- Pets can die of old age
- Pets get older quicker if they are too sick?

## Games
- Play games with the pet
  - rock paper scissors
  - cards?

## Improve ask
- Can give a name when !asking, to get more varied descriptions

## Exercise and Inventory
- Play action (+happiness, -energy, +dirty)
- Event items (select items, exercise/other events)

## Dirtyness
- Gets dirty over time, specially when overeating?
- If dirty, gets sick
- Can be cleaned
- Poo

## Networking
- pets can visit each other and play?
- transmit disease?
- Give gifts?

## Improve code
- Logging to files
- Unit testing
- Debug commands
- Check version when loading pets

## Snacking
- Snacking with emotes
- Little food, gets dirty, +happiness
- Weight? Addiction?

## Habits
- user can influence the pet sleeping time
- user can change pet favorites by feeding them over and over something?
