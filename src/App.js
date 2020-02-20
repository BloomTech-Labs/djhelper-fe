import React from 'react';
import {Route} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          DJ Helper
        </h1>
        
      </header>
      
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </div>
  );
}

export default App;
