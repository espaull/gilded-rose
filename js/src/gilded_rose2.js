function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  for (const item of items) {
    const { name } = item;

    if (name.match(/sulfuras/i)) continue;

    const upperQuality = Math.max(item.quality, 50);

    item.sell_in--;

    if (!name.match(/brie/i) && !name.match(/passes/i)) {
      item.quality =
        item.sell_in < 0
          ? Math.max(0, item.quality - 2)
          : Math.max(0, item.quality - 1);
    }

    if (name.match(/brie/i)) {
      item.quality = Math.min(upperQuality, item.quality + 1);
    }

    if (name.match(/passes/i)) {
      if (item.sell_in <= 0) item.quality = 0;
      else if (item.sell_in <= 5)
        item.quality = Math.min(upperQuality, item.quality + 3);
      else if (item.sell_in <= 10)
        item.quality = Math.min(upperQuality, item.quality + 2);
      else item.quality = Math.min(upperQuality, item.quality + 1);
    }

    if (name.match(/conjured/i) && item.quality > 0) {
      item.quality =
        item.sell_in < 0
          ? Math.max(0, item.quality - 2)
          : Math.max(0, item.quality - 1);
    }
  }
}
