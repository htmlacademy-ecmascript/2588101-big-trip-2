const firstLetterCap = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {firstLetterCap, getRandomArrayElement, updateItem};
