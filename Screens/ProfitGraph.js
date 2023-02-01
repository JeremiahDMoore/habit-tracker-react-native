
import React, { useState, useEffect } from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryArea } from 'victory-native';
import { firebase } from '../config';

const ProfitGraph = () => {
  const [cumulativeProfit, setCumulativeProfit] = useState([]);  
  const [selectedData, setSelectedData] = useState(null);

  const handleDataSelect = (data) => {
    setSelectedData(data);    
  };

 
  useEffect(() => {
    const sessionsRef = firebase.firestore().collection('cashGameSessions').orderBy("date", "asc");
    const unsubscribe = sessionsRef.onSnapshot((querySnapshot) => {
      const data = [];
      let cumulative = 0;
      
      querySnapshot.forEach((doc) => {
        let date = doc.get('date');
                    //convert timestamp to MM/DD/YYYY format
        date = new Date(date.seconds * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let time = `${hours}:${minutes}:${seconds} ${ampm}`;
        date = month + '/' + day + '/' + year + '\n ' + time;
        cumulative += doc.data().profit;
        data.push({
          x: date,
          y: cumulative,
        });
      });
      setCumulativeProfit(data);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    
   <VictoryChart 
      style={{
         parent: { maxWidth: '95%' },
         background: { fill: '#fff' },
         
         }}>
    <VictoryLabel 
      text="Results" x={200} y={15} 
      textAnchor="middle"
    />
    <VictoryArea
      padding={{ top: 60, bottom: 80, left: 50, right: 50 }}
      interpolation="cardinal"
      style={{ data: { fill: "#5cbf75" } }}
      data={cumulativeProfit}
    />
      <VictoryLine
        domain={{ y: [Math.min(...cumulativeProfit.map(d => d.y)) - 150, Math.max(...cumulativeProfit.map(d => d.y)) + 150] }}
        interpolation="cardinal"
        style={{
          data: { stroke: '#4287f5' },
          parent: { border: '1px solid #ccc' },
        }}
        data={cumulativeProfit}
      />
      <VictoryAxis      
        offsetY = {50}
        style={{       
          tickLabels: {
            fill: "transparent"
          },   
          axisLabel: { padding: 30 },
          grid: { stroke: '#fff', strokeWidth: 1, strokeDasharray: "3,3" },          
        }}        
      />
      <VictoryAxis
        dependentAxis
        style={{
          axisLabel: { padding: 30 },
          grid: { stroke: '#fff', strokeWidth: 1, strokeDasharray: "3,3" },          
        }}
        tickFormat={(x) => `$${x}`}        
      />
      <VictoryScatter
        style={{ 
          data: { 
            fill: (datum) => datum.y >= 0 ? '#4287f5' : '#ff4136',
            cursor: 'pointer',
            stroke: "transparent",
            strokeWidth: 5
          },
          
        }}
        size={6}
        symbol="circle"
        data={cumulativeProfit}
        events={[{
          target: 'data',
          eventHandlers: {
            onPressIn: (evt, data) => {
              handleDataSelect(data);
            }
          }
        }]}
      />
      {
        selectedData && (
          <VictoryLabel
            text={`Date: ${selectedData.x}\nProfit: $${selectedData.y}`}
            x={selectedData.x}
            y={selectedData.y}
            style={{
              fontSize: 12,
              fill: "#444",
            }}
          />
        )
      }
    </VictoryChart>
  );
};



export default ProfitGraph;

