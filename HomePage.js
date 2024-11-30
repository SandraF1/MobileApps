import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

const API_URL = 'http://192.168.1.244:3001'; // Ensure that this URL is correct

const HomePage = ({ setPage, setCurrentProfile, fontSize }) => {
  const [profiles, setProfiles] = useState([]);  // State for storing notes
  const [refresh, setRefresh] = useState(false);  // State to trigger re-fetch of notes

  // Fetch notes from the API
  const fetchProfiles = () => {
    fetch(`${API_URL}/getProfiles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setProfiles(data))
      .catch(() => alert('Failed to fetch notes.'));
  };

  // Fetch notes when the component mounts or refresh state changes
  useEffect(() => {
    fetchProfiles();
  }, [refresh]);

  return (
    <View style={styles.container}>
      {/* Main title */}
      <Text style={[styles.title, { fontSize }]}>Profiles</Text>

    

      <TouchableOpacity style={styles.button} onPress={() => setPage('addProfile')}>
        <Text style={[styles.buttonText, {fontSize}]}>Add Profile</Text>
      </TouchableOpacity>

      {/* Replace Button with TouchableOpacity for "Settings" */}
      <TouchableOpacity style={styles.button} onPress={() => setPage('settings')}>
        <Text style={[styles.buttonText, {fontSize}]}>Settings</Text>
      </TouchableOpacity>


      {/* List of notes */}
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentProfile(item);
              setPage('viewProfile');
            }}
          >
            {/* Wrap note title in Text component */}
            <Text style={[styles.profileTitle, { fontSize }]}>
              {item.id} {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20},
  title: { marginBottom: 20 },
  noteTitle: { marginBottom: 10 },
});

export default HomePage;