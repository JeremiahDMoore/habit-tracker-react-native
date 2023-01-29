// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryTheme } from 'victory-native';
// import { firebase } from '../config';

// // WE NEED TO MAKE THE GRAPH SHOW THE CUMULATIVE PROFIT
// // 1. we need to push the profit values into an array, and then add them up progressively:
// // arr = [420, 560, -145, -200, 1002, 1300, 45, -10] display arr[0], arr[0] + arr[1], arr[0] + arr[1] + arr[2], etc.

// const ProfitGraph = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const unsubscribe = firebase.firestore().collection('cashGameSessions').onSnapshot((querySnapshot) => {
//         const newData = [];
//         querySnapshot.forEach((documentSnapshot) => {
//             let date = documentSnapshot.get('date');
//             //convert timestamp to MM/DD/YYYY format
//             date = new Date(date.seconds * 1000);
//             let month = date.getMonth() + 1;
//             let day = date.getDate();
//             let year = date.getFullYear();
//             date = month + '/' + day + '/' + year;
            
//             newData.push({
//                 date: date,
//                 profit: documentSnapshot.get('profit')
//             });
//         });
//         setData(newData);
//     });
//     return () => unsubscribe();
//   }, []);

//   let profitArray = [];

// firebase.firestore().collection('cashGameSessions').get()
//   .then(sessions => {
//     sessions.forEach(session => {
//       profitArray.push(session.data().profit);
//     });

//     let cumulativeProfit = 0;
//     let cumulativeProfitArray = profitArray.map(profit => {
//       cumulativeProfit += profit;
//       return cumulativeProfit;
//     });

//     console.log(cumulativeProfitArray);
//   });


//   return (
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      
//       <VictoryChart
//         theme={VictoryTheme.material}
//         width={400}
//         height={200}
//         padding={{ left: 50, right: 50, top: 20, bottom: 47 }}
//         domainPadding={20}
//         >
//         <VictoryLabel text="Profit over Time" x={200} y={15} textAnchor="middle"/>
//         <VictoryLine
//           style={{
//             data: { stroke: "blue", strokeWidth: 2 },
//             parent: { border: "1px solid #ccc"}
//           }}
//           interpolation="natural"
//           data={data}
//           x="date"
//           y="profit"
//         />
//         <VictoryScatter
//           style={{ data: { fill: "tomato" } }}
//           size={5}
//           data={data}
//           labels={data.map(d => `$${d.profit}`)}
//           labelComponent={<VictoryLabel dy={-10} />}
//           x="date"
//           y="profit"
//         />
//         <VictoryAxis
//           offsetY = {50}
//           tickValues={data.map(d => d.date)}
//           tickFormat={(t) => t}
//         />
//         <VictoryAxis dependentAxis
//           tickValues={data.map((d,i)=>i*250)} 
//           tickFormat={(y) => `$${y}`}
//         />
//       </VictoryChart>
//     </View>
//   );
// }

// export default ProfitGraph;
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryTheme } from 'victory-native';
import { firebase } from '../config';

const ProfitGraph = () => {
  const [cumulativeProfit, setCumulativeProfit] = useState([]);

  useEffect(() => {
    const sessionsRef = firebase.firestore().collection('cashGameSessions');
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
                    date = month + '/' + day + '/' + year;
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
    
   <VictoryChart style={{ parent: { maxWidth: '100%' } }}>
    <VictoryLabel text="Profit over Time" x={200} y={15} textAnchor="middle"/>
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' },
        }}
        data={cumulativeProfit}
      />
      <VictoryAxis
        offsetY = {50}
        style={{
          axisLabel: { padding: 30 },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          axisLabel: { padding: 30 },
        }}
        tickFormat={(x) => `$${x}`}
      />
      <VictoryScatter
        style={{ data: { fill: '#c43a31' } }}
        size={7}
        data={cumulativeProfit}
        labels={cumulativeProfit.map((d) => `$${d.y}`)}
        labelComponent={<VictoryLabel dy={-10} dx={10} angle={-45} textAnchor="start" style={{ fill: "red" }} />}

      />

      </VictoryChart>
        );
      };

export default ProfitGraph;


// <View style={{ alignItems: 'center', justifyContent: 'center' }}>      
//       <VictoryChart
//         theme={VictoryTheme.material}
//         width={400}
//         height={200}
//         padding={{ left: 50, right: 50, top: 20, bottom: 47 }}
//         domainPadding={20}
//         >
//         <VictoryLabel text="Profit over Time" x={200} y={15} textAnchor="middle"/>
//         <VictoryLine
//           style={{
//             data: { stroke: "blue", strokeWidth: 2 },
//             parent: { border: "1px solid #ccc"}
//           }}
//           interpolation="natural"
//           data={cumulativeProfit}
//           x="date"
//           y="profit"
//         />
//         <VictoryScatter
//           style={{ data: { fill: "tomato" } }}
//           size={5}
//           data={cumulativeProfit}
//           labels={cumulativeProfit.map(d => `$${d.profit}`)}
//           labelComponent={<VictoryLabel dy={-10} />}
//           x="date"
//           y="profit"
//         />
//         <VictoryAxis
//           offsetY = {50}
//           tickValues={cumulativeProfit.map(d => d.date)}
//           tickFormat={(t) => t}
//         />
//         <VictoryAxis dependentAxis
//           tickValues={cumulativeProfit.map((d,i)=>i*250)} 
//           tickFormat={(y) => `$${y}`}
//         />
//       </VictoryChart>
//     </View>