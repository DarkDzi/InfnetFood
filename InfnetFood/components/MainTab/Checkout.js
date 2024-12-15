import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrders } from '../OrderContext';
import * as Notifications from 'expo-notifications';

export default function Checkout({ route }) {
  const { cart, total } = route.params;
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigation = useNavigation();
  const { addOrder } = useOrders();

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Você precisa permitir notificações para receber atualizações sobre o pedido.');
      }
    };

    requestPermission();
  }, []);

const HandleConfirmOrder = async () => {
  if (address && paymentMethod) {
    const newOrder = {
      cart,
      total: parseFloat(total),
      address,
      paymentMethod,
      timestamp: Date.now(),
    };
    addOrder(newOrder);
    await sendNotification('Pedido Confirmado',`Seu pedido no valor de R$ ${total} foi confirmado!`);
    
    navigation.navigate('Tabs', { 
      screen: 'Pedidos',
      initialScreen: 'Pedidos' 
    });

    
  } else {
    alert('Por favor, preencha todos os campos obrigatórios.');
  }
};

  const sendNotification = async (title, message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: { seconds: 1 }, 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.label}>Endereço de Entrega</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Digite seu endereço"
      />

      <Text style={styles.label}>Método de Pagamento</Text>
      <TextInput
        style={styles.input}
        value={paymentMethod}
        onChangeText={setPaymentMethod}
        placeholder="Digite o método de pagamento"
      />

      <Text style={styles.total}>Total: R$ {total}</Text>

      <TouchableOpacity style={styles.button} onPress={() => HandleConfirmOrder}>
        <Text style={styles.buttonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
