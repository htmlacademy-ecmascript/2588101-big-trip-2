const firstLetterCap = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {firstLetterCap, getRandomArrayElement};
