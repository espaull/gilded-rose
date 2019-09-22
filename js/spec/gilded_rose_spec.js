describe('Gilded Rose', function() {
  // Tried to use beforeAll here but it doesn't seem to work...
  items = [
    new Item('Aged Brie', 2, 0),
    new Item('Elixir of the Mongoose', 5, 7),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    new Item('Conjured Mana Cake', 3, 6),
    new Item('Bear Hide', 10, 45),
  ];

  it('should populate the itemTypes object based on item name', () => {
    categoriseItems();

    expect(itemTypes.cheese.items.length).toBe(1);
    expect(itemTypes.legendary.items.length).toBe(1);
    expect(itemTypes.pass.items.length).toBe(1);
    expect(itemTypes.conjured.items.length).toBe(1);
    expect(itemTypes.regular.items.length).toBe(2);
  });

  it('should update all items quality and sell_in values when update_quality is called', () => {
    update_quality();

    expect(items[0].quality).toBe(1);
    expect(items[1].quality).toBe(6);
    expect(items[2].quality).toBe(80);
    expect(items[3].quality).toBe(21);
    expect(items[4].quality).toBe(4);
    expect(items[5].quality).toBe(44);
  });

  it('should subtract 1 from a regular items quality if sell_in is greater 0, 2 if not', () => {
    const item = new Item('Bear Hide', 5, 10);

    updateQuality(item, 'regular', 1);

    expect(item.quality).toBe(9);
    expect(item.sell_in).toBe(4);

    item.sell_in = 0;

    updateQuality(item, 'regular', 1);

    expect(item.quality).toBe(7);
    expect(item.sell_in).toBe(-1);
  });

  it('should subtract 2 from a conjured items quality if sell_in is greater 0, 4 if not', () => {
    const item = new Item('Conjured Mana Strudel', 5, 10);

    updateQuality(item, 'conjured', 2);

    expect(item.quality).toBe(8);
    expect(item.sell_in).toBe(4);

    item.sell_in = 0;

    updateQuality(item, 'conjured', 2);

    expect(item.quality).toBe(4);
    expect(item.sell_in).toBe(-1);
  });

  it('should do nothing if the item is legendary', () => {
    const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

    updateQuality(item, 'legendary', 0);

    expect(item.quality).toBe(80);
    expect(item.sell_in).toBe(0);
  });

  it('should add 1 to Aged Brie as it gets older, regardless of sell_in value', () => {
    const item = new Item('Aged Brie', 2, 10);

    updateQuality(item, 'cheese', -1);
    updateQuality(item, 'cheese', -1);
    updateQuality(item, 'cheese', -1);
    updateQuality(item, 'cheese', -1);
    updateQuality(item, 'cheese', -1);

    expect(item.quality).toBe(15);
    expect(item.sell_in).toBe(-3);
  });

  it('should add 1 to quality of backstage passes if sell_in is > 10', () => {
    const item = new Item('Backstage Pass', 15, 20);

    updateQuality(item, 'pass', -1);

    expect(item.quality).toBe(21);
    expect(item.sell_in).toBe(14);
  });

  it('should add 2 to quality of backstage passes if sell_in is <= 10', () => {
    const item = new Item('Backstage Pass', 10, 20);

    updateQuality(item, 'pass', -1);

    expect(item.quality).toBe(22);
    expect(item.sell_in).toBe(9);
  });

  it('should add 3 to quality of backstage passes if sell_in is <= 5', () => {
    const item = new Item('Backstage Pass', 5, 20);

    updateQuality(item, 'pass', -1);

    expect(item.quality).toBe(23);
    expect(item.sell_in).toBe(4);
  });

  it('should set quality of backstage passes to 0 if sell_in is <= 0', () => {
    const item = new Item('Backstage Pass', 0, 20);

    updateQuality(item, 'pass', -1);

    expect(item.quality).toBe(0);
    expect(item.sell_in).toBe(-1);
  });

  it('should not decay an items quality below 0', () => {
    const item = new Item('test', 10, 0);

    decayQuality(item, 100);

    expect(item.quality).toBe(0);
  });

  it('should not increase an items quality above 50', () => {
    const item = new Item('Some sort of hat', 10, 50);

    decayQuality(item, -100);

    expect(item.quality).toBe(50);
  });
});
