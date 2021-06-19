import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar/Navigation';
import Home from './Pages/Home';
import About from './Pages/About';
import Minted from './Pages/Minted';
import Temp from './screens/Temp';
import Dashboard from './Pages/Dashboard'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return(
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/home' exact component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/minted' component={Minted}/>
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/temp' component={Temp} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;