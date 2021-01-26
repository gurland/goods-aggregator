import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import './style.scss';
import { store } from '../../utils/store';
import { createDarkThemeClassName } from '../../utils/helpers';
import { getChartData } from '../../utils/api';

function PriceGraph({ className, series }) {
  const { state } = useContext(store);
  const timeData = [];

  for (let i = 1; i <= 30; i++) {
    timeData.push(`2020/${i}/12`);
  }

  function getData() {
    const data = [];

    for (let i = 1; i <= 100; i++) {
      data.push(Math.floor(Math.random() * Math.floor(40)));
    }

    return data;
  }

  function getOption() {
    const options = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        },
      },
      legend: {
        data: ['Skvyrianka'],
        show: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        data: timeData,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '40%'],
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20,
        },
        {
          start: 0,
          end: 20,
        },
      ],
      series,
    };

    if (state.darkTheme) {
      options.grid = {
        backgroundColor: '#212936',
        show: true,
      };
      options.xAxis.axisLabel = {
        show: true,
        textStyle: {
          color: '#fff',
        },
      };
      options.yAxis.axisLabel = {
        show: true,
        textStyle: {
          color: '#fff',
        },
      };
      options.legend.textStyle = {
        color: '#fff',
      };
    } else {
      options.grid = {
        backgroundColor: '#fff',
        show: true,
      };
      options.xAxis.axisLabel = {
        show: true,
        textStyle: {
          color: '#000',
        },
      };
      options.yAxis.axisLabel = {
        show: true,
        textStyle: {
          color: '#000',
        },
      };
      options.legend.textStyle = {
        color: '#000',
      };
    }

    return options;
  }

  return (
    <Card fluid className={createDarkThemeClassName(className, state.darkTheme)}>
      <Card.Content>
        <ReactEcharts option={getOption()} />
      </Card.Content>
    </Card>
  );
}

PriceGraph.propTypes = {
  className: PropTypes.string,
};

PriceGraph.defaultProps = {
  className: '',
};

export default PriceGraph;
