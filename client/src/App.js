import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar/Navigation';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return(
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/dashboard' component={Dashboard} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;