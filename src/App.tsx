import React from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from './Autocomplete';

const suggestions = ['Apple', 'Banana', 'Cherry', 'Donut', 'Dracula']

function App() {
  return (
    <div className="App">
      <h2> Autocomplete</h2>
      <Autocomplete suggestions={suggestions} />
    </div>
  );
}

export default App;
