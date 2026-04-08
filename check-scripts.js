const url = 'https://game.gtimg.cn/images/js/milo/milo.js';
const text = await (await fetch(url)).text();
const phrase = 'getModulePath';
let idx = text.indexOf(phrase);
while (idx !== -1) {
  console.log('FOUND getModulePath at', idx);
  console.log(text.slice(Math.max(0, idx - 200), idx + 1200));
  idx = text.indexOf(phrase, idx + phrase.length);
}
