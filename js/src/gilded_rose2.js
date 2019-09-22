function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

/* 
Decided to write a second solution here all in one function
just because I had some time and thought why not...
I prefer my previous solution though, it's easier to unit test
and less hardcoded values makes it even more readable, in my opinion
*/
const update_quality = () => {
  for (const item of items) {
    const { name } = item;

    if (name.match(/sulfuras/i)) continue;

    item.sell_in--;

    if (!name.match(/brie/i) && !name.match(/passes/i)) {
      item.quality =
        item.sell_in < 0
          ? Math.max(0, item.quality - 2)
          : Math.max(0, item.quality - 1);
    }

    if (name.match(/brie/i)) {
      item.quality = Math.min(50, item.quality + 1);
    }

    if (name.match(/passes/i)) {
      if (item.sell_in <= 0) item.quality = 0;
      else if (item.sell_in <= 5) item.quality = Math.min(50, item.quality + 3);
      else if (item.sell_in <= 10)
        item.quality = Math.min(50, item.quality + 2);
      else item.quality = Math.min(50, item.quality + 1);
    }

    if (name.match(/conjured/i) && item.quality > 0) {
      item.quality =
        item.sell_in < 0
          ? Math.max(0, item.quality - 2)
          : Math.max(0, item.quality - 1);
    }
  }
};
