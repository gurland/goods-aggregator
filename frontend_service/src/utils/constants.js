export const retailChainsMock = [
  {
    name: 'Novus',
    avgPricePerKg: 25.44,
    buckwheatUrlPath: 'buckwheat',
    stores: [
      {
        id: '482010105',
        name: 'SkyMall',
        city: 'kiev',
        coords: '50.4931815, 30.5581461',
        lowestPricePerKg: 23,
      },
      {
        id: '48201031',
        name: 'Retroville',
        city: 'kiev',
        coords: '50.5039512, 30.4164598',
        lowestPricePerKg: 21,
      },
      {
        id: '48206110',
        name: 'Николаев',
        city: 'mykolaiv',
        coords: '46.9659448, 32.0773213',
        lowestPricePerKg: 28,
      },
    ],
  },
  {
    name: 'Metro',
    avgPricePerKg: 40,
    buckwheatUrlPath: 'buckwheat-metro',
    stores: [
      {
        id: '48215611',
        name: 'Теремки',
        city: 'kiev',
        coords: '50.37886, 30.44221',
        lowestPricePerKg: 38,
      },
      {
        id: '48215610',
        name: 'Григоренко',
        city: 'kiev',
        coords: '50.39051, 30.64142',
        lowestPricePerKg: 44,
      },
      {
        id: '48215612',
        name: 'Одеса',
        city: 'odesa',
        coords: '46.448391, 30.661012',
        lowestPricePerKg: 42,
      },
    ],
  },
  {
    name: 'Auchan',
    avgPricePerKg: 23.44,
    buckwheatUrlPath: 'buckwheat-auchan',
    stores: [
      {
        id: '48246401',
        name: 'Петровка',
        city: 'kiev',
        coords: '50.491319, 30.489957',
        lowestPricePerKg: 23,
      },
      {
        id: '48246403',
        name: 'Кільцева',
        city: 'kiev',
        coords: '50.429155, 30.355841',
        lowestPricePerKg: 20,
      },
      {
        id: '48246426',
        name: 'Харків',
        city: 'kharkiv',
        coords: '50.0288959, 36.3280964',
        lowestPricePerKg: 21,
      },
    ],
  },
];

export const productsTableData = (() => {
  const arr = [];
  for (let i = 1; i <= 5; i++) {
    arr.push({ title: `Гречка ${i}`, weight: `${100 * i} г`, price: Math.round(Math.random() * 100 * 100) / 100 });
  }
  return arr;
})();

export const links = {
  homepage: '/',
  details: '/details',
};
