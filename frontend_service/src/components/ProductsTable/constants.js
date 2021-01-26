import { formatPrice } from '../../utils/helpers';
import { Button } from 'semantic-ui-react';

export const productsColumns = (requestProductGraphData, showButton) => [
  {
    header: '',
    selector: 'producer',
    cell: (original) => {
      const logoLink = original.producer?.logo?.s64x64;
      return logoLink ? (
        <img src={original.producer?.logo?.s64x64} alt={original.producer?.name} />
      ) : (
        <img src={original.img?.s150x150} width="64" height="64" alt={original.producer?.name} />
      );
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
    cell: (original) => formatPrice(original.price),
  },
  {
    header: 'URL',
    selector: 'web_url',
    cell: (original) => <a href={original.web_url}>Open page</a>,
  },
  showButton
    ? {
        header: '',
        selector: 'ean',
        cell: (original) => (
          <Button className="to-graph-button" onClick={() => requestProductGraphData(original.ean, original.title)}>
            On graph
          </Button>
        ),
      }
    : {},
];
