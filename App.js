// frontend/App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [data, setData] = useState([
    { name: 'Loading', value: 100, color: '#d3d3d3', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/estado'); // Cambia a la IP de tu máquina si usas dispositivo físico
        const result = await response.json();
        updateData(parseFloat(result.estado));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const updateData = (newValue) => {
    setData([
      { name: 'Estado', value: newValue, color: '#f00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Restante', value: 100 - newValue, color: '#00f', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estado Actual</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default App;
