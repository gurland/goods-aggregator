import React, { useEffect, useContext } from 'react';

import { Button, Modal } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { store } from '../../utils/store';
import { createDarkThemeClassName, formatPrice } from '../../utils/helpers';
import './style.scss';

import mapData from './UA.json';

function MapModal(props) {
  const [open, setOpen] = React.useState(false);
  const { state } = useContext(store);

  useEffect(() => {
    echarts.registerMap('UA', mapData);
  }, []);

  function parseBrandData(data) {
    const res = [];

    data.stores.forEach((item) => {
      const coords = item.coords
        .split(', ')
        .map((i) => {
          return parseFloat(i, 10);
        })
        .reverse();

      res.push({
        name: data.name + ' - ' + item.product.title,
        value: coords.concat(formatPrice(item.product.price)),
      });
    });

    return res;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getOption() {
    const options = {
      title: {
        text: 'Stores map',
        left: 'center',
        padding: 20,
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${params.name} - ${params.value[2]} ₴`;
        },
      },
      geo: {
        map: 'UA',
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            areaColor: '#fbfcfd',
            borderColor: '#666666',
          },
          emphasis: {
            areaColor: '#dbeefd',
          },
        },
      },
      series: [],
    };

    state.retailChains.forEach((brand) => {
      const seriesObj = {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: parseBrandData(brand),
        symbolSize: 6,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          color: getRandomColor(),
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
      };

      options.series.push(seriesObj);
    });

    if (state.darkTheme) {
      options.title.textStyle = {
        color: '#fff',
      };
      options.geo.itemStyle = {
        normal: {
          areaColor: '#2B3648',
          borderColor: '#AFBDD1',
        },
        emphasis: {
          areaColor: '#56657F',
        },
      };
    } else {
      options.title.textStyle = {
        color: '#000',
      };
      options.geo.itemStyle = {
        normal: {
          areaColor: '#fbfcfd',
          borderColor: '#666666',
        },
        emphasis: {
          areaColor: '#dbeefd',
        },
      };
    }
    return options;
  }

  return (
    <Modal
      className={createDarkThemeClassName('map', state.darkTheme)}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic primary className="map-btn">
          Show Map
        </Button>
      }
    >
      <ReactEcharts className="mapChart" option={getOption()} />
    </Modal>
  );
}

export default MapModal;
