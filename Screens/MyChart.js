import React from 'react';
import { VictoryArea, VictoryChart, VictoryAxis } from 'victory-native';

const GradientBackground = () => (
  <VictoryArea
    style={{
      data: {
        fill: "url(#gradient)"
      }
    }}
    data={[
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 0 }
    ]}
  />
);

const MyChart = ({ cumulativeProfit }) => {
  const minProfit = Math.min(...cumulativeProfit.map(point => point.y));
  const maxProfit = Math.max(...cumulativeProfit.map(point => point.y));
  const ticks = [];
  for (let i = Math.floor(minProfit / 100) * 100; i <= maxProfit; i += 100) {
    ticks.push(i);
  }

  return (
    <VictoryChart
      height={300}
      width={500}
      domainPadding={20}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="blue" stopOpacity={0.2} />
          <stop offset="100%" stopColor="red" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <GradientBackground />
      <VictoryAxis
        dependentAxis
        tickValues={ticks}
        tickFormat={(value) => `$${value}`}
      />
    </VictoryChart>
  );
};

export default MyChart;
