// src/components/PaisItem.js
// Componente reutilizável para exibir um país

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PaisItem({ pais, onVerCidades }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{pais.nome}</Text>
      <Text>Continente: {pais.continente}</Text>
      <Text>População: {pais.populacao}</Text>

      <Button 
        title="Ver cidades"
        onPress={() => onVerCidades(pais)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 5
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
