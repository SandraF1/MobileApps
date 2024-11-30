// server.js practice6 (hardcode works on startup)

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json());

// Constants
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'profiles.json');

// Hardcoded notes data
const hardcodedProfiles = [
{
    id: 1,
    name: 'John Smith',
    phone: '02 9988 2211',
    department: '1, ICT',
    streetAddress: '1 Code Lane',
    cityAddress: 'Javaville',
    stateAddress: 'NSW',
    zipAddress: '0100',
    countryAddress:  'Australia'
},
{
    id: 2,
    name: 'Sue White',
    phone: '03 8899 2255',
    department: '2, Finance',
    streetAddress: '16 Bit Way',
    cityAddress: 'Byte Cove',
    stateAddress: 'QLD',
    zipAddress: '1101',
    countryAddress:  'Australia'

},

{
    id: 3,
    name: "Bob O'Bits",
    phone: '05 7788 2255',
    department: '3, Marketing',
    streetAddress: '8 Silicon Road',
    cityAddress: 'Cloud Hills',
    stateAddress: 'VIC',
    zipAddress: '1001',
    countryAddress:  'Australia'

},

{
    id: 4,
    name: 'Mary Blue',
    phone: '06 4455 9988',
    department: '2, Finance',
    streetAddress: '4 Processor Boulevard',
    cityAddress: 'Appletson',
    stateAddress: 'NT',
    zipAddress: '1010',
    countryAddress:  'Australia'

},

{
    id: 5,
    name: 'Mick Green',
    phone: '02 9988 1122',
    department: '3, Marketing',
    streetAddress: '700 Bandwidth Street',
    cityAddress: 'Bufferland',
    stateAddress: 'NSW',
    zipAddress: '0110',
    countryAddress:  'Australia'

}
];


// Load Notes
function loadProfiles() {
  // If the file doesn't exist, create it with hardcoded notes
  if (!fs.existsSync(DATA_FILE)) {
    console.log("Profiles file doesn't exist. Creating with hardcoded profiles.");
    fs.writeFileSync(DATA_FILE, JSON.stringify(hardcodedProfiles));
    return hardcodedProfiles;
  }

  // Return the notes from the file
  const rawData = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(rawData);
}

// Save Notes
function saveProfiles (profiles) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles));
}

// POST route to save or update a note
app.post('/saveProfiles', (req, res) => {
  const profiles = loadProfiles();
  const { id, name, phone, department, streetAddress, cityAddress, stateAddress, zipAddress, countryAddress } = req.body;

  // Validation
  if (!name || !phone || !department || !streetAddress || !cityAddress || !stateAddress ||! zipAddress || !countryAddress) {
    return res.status(400).send('Required fields are missing');
  }

  // If the ID exists, update the note
  if (id) {

    const index = profiles.findIndex(profile => profile.id === id);
    if (index === -1) {
      return res.status(404).send('Profile not found');
    }

    hardcodedProfiles[index] = { id, name, phone, department, streetAddress, cityAddress, stateAddress, zipAddress, countryAddress };
    saveProfiles(hardcodedProfiles);
    return res.json(hardcodedProfiles[index]);
  } else {
    // Auto-generate new ID for the note
    let newId = 1;
    if (profiles.length > 0) {
      // Find the highest existing ID and increment it by 1
      newId = Math.max(...profiles.map(profile => profile.id)) + 1;
    }

    const newProfile = { id: newId, name, phone, department, streetAddress, cityAddress, stateAddress, zipAddress, countryAddress };
    hardcodedProfiles.push(newProfile);
    saveProfiles(hardcodedProfiles);
    return res.json(newProfile);
  }
});

// GET route to retrieve notes
app.get('/getProfiles', (req, res) => {
  const profiles = loadProfiles();
  res.json(profiles);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});