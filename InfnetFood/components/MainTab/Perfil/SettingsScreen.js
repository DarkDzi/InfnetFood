import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const SettingsScreen = ({ setTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setTheme(isDarkMode ? DarkTheme : DefaultTheme); 
  }, [isDarkMode, setTheme]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.settingContainer}>
        <Text style={styles.text}>Tema Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)} 
          trackColor={{ false: '#e2e2e2', true: '#4cd137' }}
          thumbColor={isDarkMode ? '#2ecc71' : '#fff'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    color: '#34495e',
  },
});

export default SettingsScreen;
