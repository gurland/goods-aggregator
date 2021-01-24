import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import './style.scss';
import { store } from '../../utils/store';
import { createDarkThemeClassName } from '../../utils/helpers';

function PriceGraph({ className }) {
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
    return {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        },
      },
      legend: {
        data: ['Skvyrianka', 'Khutorok'],
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
      series: [
        {
          name: 'Skvyrianka',
          type: 'line',
          data: getData(),
        },
        {
          name: 'Khutorok',
          type: 'line',
          data: getData(),
        },
      ],
    };
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
