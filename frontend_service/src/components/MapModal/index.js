import React, { useEffect, useContext } from 'react';

import { Button, Modal } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { store } from '../../utils/store';
import { createDarkThemeClassName } from '../../utils/helpers';
import './style.scss';

import mapData from './UA.json';

function MapModal(props) {
  const [open, setOpen] = React.useState(false);
  const { state } = useContext(store);

  useEffect(() => {
    echarts.registerMap('UA', mapData);
  }, []);

  const storesData = {
    Novus: [
      {
        coordinates: [24, 50],
        name: 'Store #1',
        value: 12,
      },
      {
        coordinates: [30, 49],
        name: 'Store #2',
        value: 43,
      },
      {
        coordinates: [38, 49],
        name: 'Store #3',
        value: 31,
      },
    ],
    Metro: [
      {
        coordinates: [30, 48],
        name: 'Store #1',
        value: 24,
      },
      {
        coordinates: [29, 50],
        name: 'Store #2',
        value: 32,
      },
      {
        coordinates: [36, 49],
        name: 'Store #3',
        value: 12,
      },
    ],
    Auchan: [
      {
        coordinates: [25, 51],
        name: 'Store #1',
        value: 12,
      },
      {
        coordinates: [31, 50],
        name: 'Store #2',
        value: 43,
      },
      {
        coordinates: [34.3, 45.4],
        name: 'Store #3',
        value: 31,
      },
    ],
  };

  function getStoresData(name) {
    const res = [];

    storesData[name].forEach((store) => {
      res.push({
        name: store.name,
        value: store.coordinates.concat(store.value),
      });
    });

    return res;
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
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: getStoresData('Novus'),
          symbolSize: 12,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            color: '#00C853',
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: getStoresData('Metro'),
          symbolSize: 12,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            color: '#E53935',
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: getStoresData('Auchan'),
          symbolSize: 12,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            color: '#1976D2',
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
        },
      ],
    };

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
