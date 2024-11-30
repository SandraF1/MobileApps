import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const AddProfilePage = ({ setPage, fontSize }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
const [department, setDepartment] = useState('');
const [streetAddress, setStreetAddress] = useState('');
const [cityAddress, setCityAddress] = useState('');
const [stateAddress, setStateAddress] = useState('');
const [zipAddress, setZipAddress] = useState('');
const [countryAddress, setCountryAddress] = useState('');

  const handleSave = () => {
    if (!name || !phone || !department || !streetAddress || !cityAddress || !stateAddress || !zipAddress ||!countryAddress) {
      alert('All fields required');
      return;
    }

    // Save note with font size information



    fetch('http://192.168.1.244:3001/saveProfiles',{
    
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, department, streetAddress, cityAddress, stateAddress, zipAddress, countryAddress, fontSize }), // Include font size in request
    })
      .then(() => {setPage('home'); alert ('note saved');}) // Navigate back to home page on success
      .catch(() => alert('Failed to save note.')); // Alert if the request fails
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize }]}>Add Note</Text>
      <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />

  <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="department"
        value={department}
        onChangeText={setDepartment}
      />

  <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="streetAddress"
        value={streetAddress}
        onChangeText={setStreetAddress}
      />

  <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="cityAddress"
        value={cityAddress}
        onChangeText={setCityAddress}
      />

  <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="stateAddress"
        value={stateAddress}
        onChangeText={setStateAddress}
      />


  <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="zipAddress"
        value={zipAddress}
        onChangeText={setZipAddress}
      />

  <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="countryAddress"
        value={countryAddress}
        onChangeText={setCountryAddress}
      />



   


      <TouchableOpacity style={styles.button} onPress={handleSave}>
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
  title: { marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default AddProfilePage;