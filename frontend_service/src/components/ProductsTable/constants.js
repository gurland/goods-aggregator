export const productsColumns = [
  {
    header: 'Назва товару',
    selector: 'title',
    cell: (original) => original.title,
  },
  {
    header: 'Вага',
    selector: 'weight',
    cell: (original) => original.weight,
  },
  {
    header: 'Ціна',
    selector: 'price',
    cell: (original) => original.price,
  },
];
