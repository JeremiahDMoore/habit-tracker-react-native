import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryTheme } from 'victory-native';
import { firebase } from '../config';

const ProfitGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('cashGameSessions').onSnapshot((querySnapshot) => {
        const newData = [];
        querySnapshot.forEach((documentSnapshot) => {
            let date = documentSnapshot.get('date');
            //convert timestamp to MM/DD/YYYY format
            date = new Date(date.seconds * 1000);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let year = date.getFullYear();
            date = month + '/' + day + '/' + year;
            
            newData.push({
                date: date,
                profit: documentSnapshot.get('profit')
            });
        });
        setData(newData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      
      <VictoryChart
        theme={VictoryTheme.material}
        width={400}
        height={200}
        padding={{ left: 50, right: 50, top: 20, bottom: 47 }}
        domainPadding={20}
        >
        <VictoryLabel text="Profit over Time" x={200} y={15} textAnchor="middle"/>
        <VictoryLine
          style={{
            data: { stroke: "blue", strokeWidth: 2 },
            parent: { border: "1px solid #ccc"}
          }}
          interpolation="natural"
          data={data}
          x="date"
          y="profit"
        />
        <VictoryScatter
          style={{ data: { fill: "tomato" } }}
          size={5}
          data={data}
          x="date"
          y="profit"
        />
        <VictoryAxis
          offsetY = {50}
          tickValues={data.map(d => d.date)}
          tickFormat={(t) => t}
        />
        <VictoryAxis dependentAxis
          tickFormat={(y) => `$${y}`}
        />
      </VictoryChart>
    </View>
  );
}

export default ProfitGraph;
