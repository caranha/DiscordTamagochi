
// TODO: Use ideas from "locally sensitive hashing" and "minhashing"
// To find a hash that is not sensitive to spelling and small edit distance.

const mod = 23;

module.exports = function(name, food) {

  let f = name + food.split(" ").join("").toLowerCase();

  let t = 0;


  for (let c of f) {
    t = (t + c.charCodeAt(0)) % mod;
  }

  if (t == 0) return 0;
  if (t > 20) return 3;
  if (t > 15) return 2;
  return 1;

}
