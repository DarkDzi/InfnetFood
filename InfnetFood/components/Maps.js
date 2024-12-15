/*import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigation } from '@react-navigation/native';

const restaurants = [
  { id: 1, name: "Restaurante A", lat: -22.9068, lng: -43.1729, address: "Rua A, Centro", menu: "Feijoada" },
  { id: 2, name: "Restaurante B", lat: -22.9075, lng: -43.1735, address: "Rua B, Centro", menu: "Bacalhau" },
  { id: 3, name: "Restaurante C", lat: -22.9081, lng: -43.1740, address: "Rua C, Centro", menu: "Churrasco" },
  { id: 4, name: "Restaurante D", lat: -22.9089, lng: -43.1750, address: "Rua D, Centro", menu: "Moqueca" },
  { id: 5, name: "Restaurante E", lat: -22.9095, lng: -43.1760, address: "Rua E, Centro", menu: "Feijão Tropeiro" },
  { id: 6, name: "Restaurante F", lat: -22.9101, lng: -43.1770, address: "Rua F, Centro", menu: "Arroz de Peixe" },
  { id: 7, name: "Restaurante G", lat: -22.9110, lng: -43.1780, address: "Rua G, Centro", menu: "Pizza" },
  { id: 8, name: "Restaurante H", lat: -22.9120, lng: -43.1790, address: "Rua H, Centro", menu: "Sushi" },
  { id: 9, name: "Restaurante I", lat: -22.9130, lng: -43.1800, address: "Rua I, Centro", menu: "Hambúrguer" },
  { id: 10, name: "Restaurante J", lat: -22.9140, lng: -43.1810, address: "Rua J, Centro", menu: "Tacos" },
];

export default function MapScreen() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const navigation = useNavigation();

  const handleMarkerClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    navigation.navigate('RestaurantDetails', { restaurant });
  };

  return (
    <View style={styles.container}>
      <MapContainer
        center={[-22.9068, -43.1729]}
        zoom={15}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lng]}
            eventHandlers={{ click: () => handleMarkerClick(restaurant) }}
          >
            <Popup>{restaurant.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
*/