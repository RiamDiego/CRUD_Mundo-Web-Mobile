// src/screens/HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD Mundo</Text>

      <Text style={styles.subtitle}>
        Gerenciamento de países e cidades
      </Text>

      {/* Botão que navega para a tela de países */}
      <Button 
        title="Gerenciar Países"
        onPress={() => navigation.navigate('Paises')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  subtitle: {
    marginVertical: 20,
    fontSize: 16
  }
});
