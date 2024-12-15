import React, { useState } from 'react'; 
import { View, Text, FlatList, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

export default function ProductList({ route }) {
  const { products, categoryName } = route.params; 
  const [cart, setCart] = useState([]);
  const [scaleAnim] = useState(new Animated.Value(1));  
  const navigation = useNavigation();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    animateButtonPress();  
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

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  const handleClick = () => {
    navigation.navigate('Cart', { cart });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Produtos de {categoryName}</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(product) => product.id.toString()}
      />
      <TouchableOpacity style={styles.cartButton} onPress={handleClick}>
        <Text style={styles.cartButtonText}>Ir Ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f7',
    padding: 16,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 12,
    elevation: 3,  
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495e',
  },
  productDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#27ae60',
  },
  addButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
