import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Perfil({ email }) {
  const user = {
    photourl: 'https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png',
    name: 'Eduardo de Assis',
    email: email || 'examplo@dominio.com',
    number: '+55 21 9999-999',
    endereco: 'Rua Almeida Prado, 1847',
  };

  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user.photourl }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.phoneNumber}>{user.number}</Text>
          <Text style={styles.address}>{user.endereco}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={goToSettings}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3498db',
    marginRight: 20,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  address: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  settingsButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
