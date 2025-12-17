// src/screens/CidadesScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CidadesScreen({ route }) {

  // Recebe o país selecionado
  const { pais } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cidades de {pais.nome}
      </Text>

      <Text>
        (Aqui virá o CRUD de cidades)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  }
});
