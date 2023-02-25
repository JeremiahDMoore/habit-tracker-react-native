import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';
import { firebase } from '../config';

const HabitTracker = () => {
  const [habitData, setHabitData] = useState([]);

  useEffect(() => {
    const habitsRef = firebase.firestore().collection('habits');
    const unsubscribe = habitsRef.onSnapshot((querySnapshot) => {
      const habits = [];
      querySnapshot.forEach((doc) => {
        const { name, progress, target } = doc.data();
        habits.push({
          id: doc.id,
          name,
          progress,
          target,
        });
      });
      setHabitData(habits);
    });
    return () => unsubscribe();
  }, []);

  const handleBarClick = (data) => {
    // Prompt user to update or delete the habit data
  };

  const handleBarMouseOver = (data, event) => {
    // Show habit name and progress on hover
  };

  return (
    <VictoryChart
      domainPadding={{ x: 50 }}
      padding={{ top: 20, bottom: 80, left: 50, right: 50 }}
    >
     <VictoryLabel 
      text="Results" x={200} y={15} 
      textAnchor="middle"
    />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x}%`}
        style={{
          axis: { stroke: 'none' },
          tickLabels: {
            fontSize: 12,
            fontWeight: 'bold',
            // fontFamily: 'monospace',
            padding: 5,
            fill: '#555',
          },
          grid: {
            stroke: '#ddd',
            strokeWidth: 1,
            strokeDasharray: '3,3',
          },
        }}
      />
      <VictoryAxis
        style={{
          tickLabels: {
            fontSize: 12,
            fontWeight: 'bold',
            // fontFamily: 'monospace',
            padding: 5,
            fill: '#555',
          },
          grid: {
            stroke: '#ddd',
            strokeWidth: 1,
            strokeDasharray: '3,3',
          },
        }}
      />
      <VictoryBar
        style={{
          data: {
            fill: '#4287f5',
            width: 50,
            cursor: 'pointer',
          },
        }}
        data={habitData.map((habit) => ({
          x: habit.name,
          y: (habit.progress / habit.target) * 100,
          label: `${habit.name}\n${habit.progress}/${habit.target}`,
        }))}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onClick: (evt, data) => {
                handleBarClick(data);
              },
              onMouseOver: (evt, data) => {
                handleBarMouseOver(data, evt);
              },
            },
          },
        ]}
      />
    </VictoryChart>
  );
};

export default HabitTracker;


// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';
// import { firebase } from '../config';

// const HabitTracker = () => {
//   const [habitData, setHabitData] = useState([]);

//   // fetch data from Firebase Firestore
//   useEffect(() => {
//     const habitsRef = firebase.firestore().collection('habits');
//     const unsubscribe = habitsRef.onSnapshot((querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         const habit = {
//           name: doc.data().name,
//           target: doc.data().target,
//           progress: doc.data().progress,
//         };
//         data.push(habit);
//       });
//       setHabitData(data);
//     });
//     return () => unsubscribe();
//   }, []);

//   // calculate the total frequency across all habits
//   const target = habitData.reduce((total, habit) => {
//     return total + habit.progress;
//   }, 0);

//   // calculate the progress percentage for each habit
//   const habitProgress = habitData.map((habit) => {
//     return {
//       name: habit.name,
//       progress: (habit.progress / habit.target) * 100,
//     };
//   });

//   return (
//     <View>
//       <VictoryChart
//         height={300}
//         domainPadding={{ x: 50 }}
//         padding={{ top: 10, bottom: 50, left: 50, right: 50 }}>
//         <VictoryAxis
//           dependentAxis
//           tickFormat={(x) => `${x}%`}
//           style={{
//             axis: { stroke: '#ccc' },
//             tickLabels: { fill: '#888' },
//             grid: { stroke: '#ddd', strokeWidth: 0.5 },
//           }}
//         />
//         <VictoryAxis
//           tickFormat={(x) => `${x}`}
//           style={{
//             axis: { stroke: '#ccc' },
//             tickLabels: { fill: '#888' },
//             grid: { stroke: '#ddd', strokeWidth: 0.5 },
//           }}
//         />
//         <VictoryBar
//           data={habitProgress}
//           x="name"
//           y="progress"
//           barRatio={1}
//           labels={({ datum }) => `${datum.progress.toFixed(2)}%`}
//           style={{
//             data: {
//               fill: ({ datum }) => {
//                 // set the fill color based on progress percentage
//                 const percentage = datum.progress;
//                 if (percentage >= 90) {
//                   return '#28a745';
//                 } else if (percentage >= 50) {
//                   return '#ffc107';
//                 } else {
//                   return '#dc3545';
//                 }
//               },
//               strokeWidth: 1,
//               stroke: '#fff',
//             },
//             labels: {
//               fontSize: 10,
//               fill: ({ datum }) => {
//                 // set the label color based on progress percentage
//                 const percentage = datum.progress;
//                 if (percentage >= 90) {
//                   return '#fff';
//                 } else {
//                   return '#444';
//                 }
//               },
//             },
//           }}
//           labelComponent={<VictoryLabel dy={30} />}
//         />
//       </VictoryChart>
//     </View>
//   );
// };

// export default HabitTracker;
