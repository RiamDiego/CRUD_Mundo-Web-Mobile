import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function PaisesScreen() {
  const [paises, setPaises] = useState([]);
  const [filtro, setFiltro] = useState('');

  // Busca países sempre que o filtro mudar
  useEffect(() => {
    carregarPaises();
  }, [filtro]);

  async function carregarPaises() {
    try {
      const response = await api.get('/paises', {
        params: {
          nome: filtro
        }
      });
      setPaises(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Países</Text>

      {/* Campo de filtro */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome do país"
        value={filtro}
        onChangeText={setFiltro}
      />

      {/* Lista */}
      <FlatList
        data={paises}
        keyExtractor={(item) => item.id_pais.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.nome} ({item.sigla})</Text>
            <Text>População: {item.populacao}</Text>
            <Text>Idioma: {item.idioma}</Text>
          </View>
        )}
      />
    </View>
  );
}
