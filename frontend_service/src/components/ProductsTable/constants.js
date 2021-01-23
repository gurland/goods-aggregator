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
    header: 'Name',
    selector: 'title',
    cell: (original) => original.title,
  },
  {
    header: 'Description',
    selector: 'description',
    cell: (original) => original.description || '-',
  },
  {
    header: 'Weight',
    selector: 'weight',
    cell: (original) => original.weight,
  },
  {
    header: 'Price',
    selector: 'price',
    cell: (original) => (original.price / 100).toFixed(2),
  },
  {
    header: 'URL',
    selector: 'web_url',
    cell: (original) => <a href={original.web_url}>Open page</a>,
  },
];
