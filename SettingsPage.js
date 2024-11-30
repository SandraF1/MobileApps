import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const SettingsPage = ({ setPage, fontSize, setFontSize }) => {
  const [newFontSize, setNewFontSize] = useState(fontSize);  
  const [brightness, setBrightness] = useState(50);  
  const [sound, setSound] = useState(true);  
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (savedFontSize) {
          setNewFontSize(parseInt(savedFontSize, 10)); 
        }
      } catch (error) {
        console.error('Error loading font size:', error);
      }
    };
    loadSettings();
  }, []);

  // Function to validate input and avoid NaN
  const handleFontSizeChange = (text) => {
    // Ensure the input is a valid number and not empty
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue) && parsedValue <=36) {
      setNewFontSize(parsedValue); // Update font size with valid number
      setError('');  // Reset error
    } else if (text === '') {
      setNewFontSize('');  // Allow empty input but don't update if it's an invalid number
    }
  };

  // Handle brightness change similarly
  const handleBrightnessChange = (text) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue)) {
      setBrightness(parsedValue); // Update brightness with valid number
      setError('');  // Reset error
    } else if (text === '') {
      setBrightness('');  // Allow empty input but don't update if it's an invalid number
    }
  };

  const saveSettings = async () => {
    if (isNaN(newFontSize) || isNaN(brightness)) {
      setError('Font size and brightness must be valid numbers');
      return;
    }

    try {
      await AsyncStorage.setItem('fontSize', newFontSize.toString()); 
      setFontSize(newFontSize); 
      setPage('home');  
    } catch (error) {
      console.error('Error saving font size:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize }]}>Settings</Text>

      <Text>Font Size:</Text>
      <TextInput
        style={[styles.input, { fontSize: newFontSize || fontSize }]} // Default to current fontSize if newFontSize is empty
        value={newFontSize.toString()}
        onChangeText={handleFontSizeChange} // Use the handler to ensure valid input
        keyboardType="numeric"
      />

      <Text style={{ fontSize }}>Brightness:</Text>
      <TextInput
        style={[styles.input, { fontSize }]}
        value={brightness.toString()}
        onChangeText={handleBrightnessChange} // Use the handler for brightness change
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={{ fontSize }}>Sound Effects:</Text>
        <Switch 
          value={sound} 
          onValueChange={setSound} 
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

     


      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={[styles.buttonText, {fontSize}]}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setPage('home')}>
        <Text style={[styles.buttonText, {fontSize}]}>Cancel</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  errorText: { color: 'red' },
});

export default SettingsPage;