import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Card, Header } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import './style.scss';
import { store } from '../../utils/store';
import { createDarkThemeClassName, formatDate } from '../../utils/helpers';

function PriceGraph({ className, showGraph, graphData }) {
  const { state } = useContext(store);
  const { names, timestamps, series } = graphData;

  function getOption() {
    const options = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        },
      },
      legend: {
        data: names,
        show: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        data: formatDate(timestamps),
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
      series: series,
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
        {showGraph ? (
          <ReactEcharts option={getOption()} />
        ) : (
          <Header id="no-graph-warning">
            <p>Sorry, price information about these products is currently unavailable.</p>
            <p>Please, try again later.</p>
          </Header>
        )}
      </Card.Content>
    </Card>
  );
}

PriceGraph.propTypes = {
  className: PropTypes.string,
  showGraph: PropTypes.bool.isRequired,
};

PriceGraph.defaultProps = {
  className: '',
};

export default PriceGraph;
