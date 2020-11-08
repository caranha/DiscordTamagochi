
module.exports = function (millisecs) {
  let secs = Math.floor(millisecs / 1000);
  if (secs < 60) return `${secs} second${secs < 2 ? '':'s'}`;

  let minutes = Math.floor(secs / 60);
  if (minutes < 60) return `${minutes} minute${minutes < 2 ? '':'s'}`;

  let hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours < 2 ? '':'s'}`;

  let days = Math.floor(hours / 24);
  return `${days} day${days < 2 ? '':'s'}`;
}
