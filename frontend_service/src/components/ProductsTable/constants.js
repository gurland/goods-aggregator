export const productsColumns = [
  {
    header: '',
    selector: 'producer',
    cell: (original) => {
      const logoLink = original.producer?.logo?.s64x64;
      return logoLink ? <img src={original.producer?.logo?.s64x64} alt={original.producer?.name} /> : null;
    },
  },
  {
    header: 'Назва товару',
    selector: 'title',
    cell: (original) => original.title,
  },
  {
    header: 'Description',
    selector: 'description',
    cell: (original) => original.description || '-',
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
  {
    header: 'URL',
    selector: 'web_url',
    cell: (original) => <a href={original.web_url}>Open page</a>,
  },
];
