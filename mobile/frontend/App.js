import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  // Estado para armazenar os países recebidos do backend
  const [paises, setPaises] = useState([]);

  // Estados para os filtros de nome e continente
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [continenteFiltro, setContinenteFiltro] = useState('');

  // Função para buscar os países no backend
  const fetchPaises = async () => {
    // Substitua 'SEU_BACKEND_RAILWAY_URL' pela URL real do seu backend
    let url = 'mysql://root:IoDgvizQtGMnpZogdWZPLBMSSsKcBoOn@shortline.proxy.rlwy.net:20936/railway';

    // Adiciona parâmetros de filtro à URL se houver valores
    if (nomeFiltro) url += `nome=${nomeFiltro}&`;
    if (continenteFiltro) url += `id_cont=${continenteFiltro}&`;

    try {
      // Requisição GET ao backend
      const res = await fetch(url);
      const data = await res.json();

      // Atualiza o estado com os dados recebidos
      setPaises(data);
    } catch (err) {
      console.error('Erro ao buscar países:', err);
    }
  };

  // useEffect executa a busca sempre que os filtros mudarem
  useEffect(() => {
    fetchPaises();
  }, [nomeFiltro, continenteFiltro]); // Dependências: atualiza ao mudar nomeFiltro ou continenteFiltro

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CRUD Mundo - Países</Text>

      {/* Inputs para os filtros */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome"
        value={nomeFiltro}
        onChangeText={setNomeFiltro}
      />
      <TextInput
        style={styles.input}
        placeholder="Filtrar por continente (ID)"
        value={continenteFiltro}
        onChangeText={setContinenteFiltro}
      />

      {/* Botão para buscar os países com os filtros */}
      <Button title="Filtrar" onPress={fetchPaises} />

      {/* Lista de países */}
      <FlatList
        data={paises}
        keyExtractor={(item) => item.id_pais.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              {item.nome} ({item.sigla}) - População: {item.populacao}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

// Estilos do app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10
  },
  card: {
    padding: 10,
    borderBottomWidth: 1
  }
});
