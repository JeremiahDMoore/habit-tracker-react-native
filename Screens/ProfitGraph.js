import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryScatter, VictoryTheme } from 'victory-native';
import { firebase } from '../config';

// WE NEED TO MAKE THE GRAPH SHOW THE CUMULATIVE PROFIT

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
          labels={data.map(d => `$${d.profit}`)}
          labelComponent={<VictoryLabel dy={-10} />}
          x="date"
          y="profit"
        />
        <VictoryAxis
          offsetY = {50}
          tickValues={data.map(d => d.date)}
          tickFormat={(t) => t}
        />
        <VictoryAxis dependentAxis
          tickValues={data.map((d,i)=>i*250)} 
          tickFormat={(y) => `$${y}`}
        />
      </VictoryChart>
    </View>
  );
}

export default ProfitGraph;


// import React, { useState, useEffect } from "react";
// import { View, Text } from "react-native";
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter, VictoryLabel, VictoryTheme } from "victory-native";
// import { firebase } from '../config';

// const ProfitGraph = () => {
//     // Initialize state variables to store the data from Firestore
//     const [data, setData] = useState([]);

//     // Use useEffect hook to fetch data from Firestore when the component mounts
//     useEffect(() => {
//         const db = firebase.firestore();
//         const profitsRef = db.collection("cashGameSessions");
//         profitsRef.onSnapshot((querySnapshot) => {
//             let newData = [];
//             querySnapshot.forEach((doc) => {
//                 newData.push({
//                     date: doc.data().date.toDate(),
//                     profit: doc.data().profit
//                 });
//             });
//             // sort the data by date
//             newData.sort((a, b) => {
//                 return a.date - b.date;
//             });
//             //convert date to MM/DD/YYYY format
//             newData.forEach((item) => {
//                 item.date = `${item.date.getMonth() + 1}/${item.date.getDate()}/${item.date.getFullYear()}`
//             });
//             // Add cumulative profit
//             let cumulativeProfit = 0;
//             newData.forEach((item) => {
//                 cumulativeProfit += item.profit;
//                 item.profit = cumulativeProfit;
//             });
//             setData(newData);
//         });
//     }, []);

//     return (
//         <View>
//             <VictoryChart theme={VictoryTheme.material}>
//                 <VictoryAxis
//                   tickValues={data.map((d,i)=>i*250)} 
//                   style={{
//                         axis: { stroke: "#756f6a" },
//                         grid: { stroke: "grey" },
//                         ticks: { stroke: "grey", size: 5 },
//                         tickLabels: { fontSize: 8, padding: 5, fill: "grey" }
//                     }}
//                 />
//                 <VictoryAxis
//                     dependentAxis
//                     tickFormat={(y) => `$${y}`}
//                     style={{
//                         axis: { stroke: "#756f6a" },
//                         grid: { stroke: "grey" },
//                         ticks: { stroke: "grey", size: 5 },
//                         tickLabels: { fontSize: 8, padding: 5, fill: "grey" }
//                     }}
//                 />
//                 <VictoryLine
//                     data={data}
//                     x="date"
//                     y="profit"
//                     style={{
//                         data: { stroke: "#c43a31" },
//                         parent: { border: "1px solid #ccc"}
//                     }}
//                     interpolation="cardinal"
//                 />
//             <VictoryScatter
//                 size={5}
//                 style={{ data: { fill: "white" } }}
//                 labels={data.map(d => `$${d.profit}`)}
//                 labelComponent={<VictoryLabel dy={-10} />}
//                 data={data}
//             />
//         </VictoryChart>
//         </View>
//     );
// }
// export default ProfitGraph;

