import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';

import socketio from 'socket.io-client';

import logo from '../../assets/logo.png';
import SpotList from '../../components/SpotList';

function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.197:3333', {
        query: { user_id },
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} para o dia ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView style={{ marginTop: 15 }}>
        {techs.map(tech => (
          <SpotList
            key={tech}
            tech={tech}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10,
  },
});
