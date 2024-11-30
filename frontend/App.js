import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import HomePage from './HomePage';
import AddProfilePage from './AddProfilePage';
import ViewProfilePage from './ViewProfilePage';
import EditProfilePage from './EditProfilePage';
import SettingsPage from './SettingsPage';
import AsyncStorage from '@react-native-async-storage/async-storage';  

const App = () => {
  const [page, setPage] = useState('home');  // Manage which page is being shown
  const [fontSize, setFontSize] = useState(16);  // State for font size
  const [currentProfile, setCurrentProfile] = useState(null);

  const handleCurrentProfile = (profile) => {
    console.log('Selected profile:', profile);
  };

 // Load font size from AsyncStorage on app start
 useEffect(() => {
  const loadFontSize = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('fontSize');
      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize, 10));  // Set font size from storage
      }
    } catch (error) {
      console.error('Error loading font size:', error);
    }
  };

  loadFontSize();
}, []);


  return (
    <View style={{ flex: 1 }}>
      {page === 'home' && <HomePage setPage={setPage} setCurrentProfile={setCurrentProfile} fontSize={fontSize} />}
      {page === 'settings' && <SettingsPage setPage={setPage} fontSize={fontSize} setFontSize={setFontSize} />}
      {page === 'addProfile' && <AddProfilePage setPage={setPage} fontSize={fontSize} setFontSize={setFontSize} />}
    
{page === 'viewProfile' && currentProfile && (
    <ViewProfilePage setPage={setPage} profile={currentProfile} fontSize={fontSize} setFontSize={setFontSize} />
  )}

    
        {page === 'editProfile' && <EditProfilePage setPage={setPage} profile={currentProfile} fontSize={fontSize} setFontSize={setFontSize} />}

    </View>
  );
};

export default App;