function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

const itemTypes = {
  conjured: { items: [], baseDecay: 2 },
  legendary: { items: [], baseDecay: 0 },
  cheese: { items: [], baseDecay: -1 },
  pass: { items: [], baseDecay: -1 },
  regular: { items: [], baseDecay: 1 },
};

const categoriseItems = () => {
  for (const item of items) {
    if (item.name.match(/conjured/gi) != null) {
      itemTypes['conjured'].items.push(item);
    } else if (item.name.match(/sulfuras/gi) != null) {
      itemTypes['legendary'].items.push(item);
    } else if (item.name.match(/brie/gi) != null) {
      itemTypes['cheese'].items.push(item);
    } else if (item.name.match(/passes/gi) != null) {
      itemTypes['pass'].items.push(item);
    } else {
      itemTypes['regular'].items.push(item);
    }
  }
};

const decayQuality = (item, decayRate) => {
  const { quality } = item;
  let newQuality = quality - decayRate;

  if (newQuality > 50) newQuality = 50;
  if (newQuality < 0) newQuality = 0;

  item.quality = newQuality;
  item.sell_in -= 1;
};

const updateQuality = (item, type, sell_in, baseDecay) => {
  let decayRate = baseDecay;

  if (type === 'legendary') return;

  if (type === 'pass') {
    if (sell_in <= 0) {
      return (item.quality = 0);
    } else if (sell_in <= 5) {
      decayRate = -3;
    } else if (sell_in <= 10) {
      decayRate = -2;
    }
  } else {
    if (sell_in < 0) {
      decayRate *= 2;
    }
  }

  decayQuality(item, decayRate);
};

const updateItems = () => {
  Object.keys(itemTypes).map(type => {
    for (const item of itemTypes[type].items) {
      updateQuality(item, type, item.sell_in, itemTypes[type].baseDecay);
    }
  });
};
