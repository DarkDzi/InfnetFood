import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useOrders } from '../OrderContext';

export default function Pedidos() {
  const { orders } = useOrders();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderDate}>
                Pedido realizado em: {new Date(item.timestamp).toLocaleString()}
              </Text>
              <Text style={styles.totalPrice}>
                Total: R$ {item.total && !isNaN(item.total) ? item.total.toFixed(2) : '0.00'}
              </Text>

              {item.cart.map((product, index) => (
                <View key={product.id} style={styles.productItem}>
                  <Text style={styles.productName}>
                    {product.name} x {product.quantity} 
                  </Text>
                  <Text style={styles.productPrice}>
                    - R$ {(product.price * product.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyOrders}>Nenhum pedido realizado ainda.</Text>
      )}
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  orderItem: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, 
  },
  orderDate: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  productName: {
    fontSize: 16,
    color: '#34495e',
  },
  productPrice: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  emptyOrders: {
    fontStyle: 'italic',
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
});
