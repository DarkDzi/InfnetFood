import { Text, SafeAreaView, StyleSheet, Button, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Card } from 'react-native-paper';

export default function Home() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissões de Notificação', 'Você precisa permitir as notificações para receber atualizações');
      }
    };

    getNotificationPermission();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch("https://api.npoint.io/2479a7800b441f1f794c");
        if (!response.ok) {
          throw new Error("Network failed");
        }
        const responseData = await response.json();
        const data = responseData.categories.flatMap((category) => category.products);
        setProducts(data);
        setCategories(responseData.categories);
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar dados.');
      }
    };

    FetchData();
  }, []);

  const handleCategoryClick = (products, categoryName) => {
    navigation.navigate("ProductList", { products, categoryName });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryClick(item.products, item.name)}>
      <Card style={styles.categoryCard}>
        <Text style={styles.categoryName}>{item.name}</Text>
      </Card>
    </TouchableOpacity>
  );

  const renderProducts = ({ item }) => (
    <Card style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <Text style={styles.headerText}>Categorias</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
        />

        {selectedProducts.length > 0 && (
          <>
            <Text style={styles.headerText}>Produtos Selecionados</Text>
            <FlatList
              data={selectedProducts}
              renderItem={renderProducts}
              keyExtractor={(product) => product.id.toString()}
            />
          </>
        )}
      </ScrollView>

      <View style={styles.logoutContainer}>
        <Button onPress={() => navigation.goBack()} title="Deslogar" color="#E74C3C" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#34495e',
  },
  productPrice: {
    fontSize: 16,
    color: '#16a085',
    marginTop: 8,
  },
  logoutContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
