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
  item.quality =
    decayRate > 0
      ? Math.max(0, item.quality - decayRate)
      : Math.min(50, item.quality - decayRate);
};

const updateQuality = (item, type, baseDecay) => {
  let decayRate = baseDecay;

  if (type === 'legendary') return;

  item.sell_in--;

  if (type === 'pass') {
    if (item.sell_in <= 0) {
      return (item.quality = 0);
    } else if (item.sell_in <= 5) {
      decayRate = -3;
    } else if (item.sell_in <= 10) {
      decayRate = -2;
    }
  } else if (type !== 'cheese') {
    if (item.sell_in < 0) {
      decayRate *= 2;
    }
  }

  decayQuality(item, decayRate);
};

const update_quality = () => {
  Object.keys(itemTypes).map(type => {
    for (const item of itemTypes[type].items) {
      updateQuality(item, type, itemTypes[type].baseDecay);
    }
  });
};
