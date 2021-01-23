import React, { useEffect } from 'react';

import { Button, Modal } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import PropTypes from 'prop-types';
import './style.scss';

import mapData from './UA.json';

function MapModal(props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    echarts.registerMap('UA', mapData);
  }, []);

  const storesData = [
    {
      coordinates: [25, 51],
      name: 'Novus',
      value: 228,
    },
    {
      coordinates: [31, 50],
      name: 'Metro',
      value: 1488,
    },
    {
      coordinates: [34.3, 45.4],
      name: 'Auchan',
      value: 1337,
    },
  ];

  function getStoresData() {
    const res = [];

    storesData.forEach((store) => {
      res.push({
        name: store.name,
        value: store.coordinates.concat(store.value),
      });
    });

    return res;
  }

  function getOption() {
    return {
      title: {
        text: 'Stores map',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${params.name} - ${params.value[2]} ₴`;
        },
      },
      visualMap: {
        type: 'piecewise',
        textStyle: {
          color: '#00000',
        },
        pieces: [
          { min: 300, label: 'High', color: '#e3bf4c' },
          { min: 200, max: 300, label: 'Middle', color: '#be4f51' },
          { min: 100, max: 200, label: 'Low', color: '#60c2cc' },
        ],
        color: ['#e3bf4c', '#be4f51', '#60c2cc'],
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
          data: getStoresData(),
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
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
        },
      ],
    };
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic primary>
          Show Map
        </Button>
      }
    >
      <ReactEcharts className="mapChart" option={getOption()} />
    </Modal>
  );
}

export default MapModal;
