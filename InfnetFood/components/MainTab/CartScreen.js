import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrders } from '../OrderContext';

export default function Cart({ route }) {
  const { cart } = route.params;
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(1));
  const { addOrder } = useOrders();

  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    setTotal(totalPrice);
  }, [cart]);

  const handleConfirmOrder = () => {
    if (cart.length > 0) {
      const newOrder = {
        cart,
        total: parseFloat(total),
      };
      addOrder(newOrder);
      animateButtonPress();

      setTimeout(() => {
        navigation.navigate('Checkout', { cart, total });
      }, 500);
    } else {
      alert('O carrinho está vazio! Adicione produtos antes de confirmar.');
    }
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Carrinho</Text>
      <ScrollView>
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name} - Quantidade: {item.quantity}</Text>
                <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyCart}>O carrinho está vazio</Text>
        )}
      </ScrollView>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View style={styles.buttonWrapper}>
          <Button title="Confirmar Pedido" onPress={handleConfirmOrder} color="#e74c3c" />
        </View>
      </Animated.View>

      <Text style={styles.totalPrice}>Total: R$ {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
    paddingBottom: 40,
  },
  cartTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  itemPrice: {
    fontSize: 16,
    color: '#27ae60',
    marginTop: 5,
  },
  emptyCart: {
    fontStyle: 'italic',
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 30,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e74c3c', 
  },
});
