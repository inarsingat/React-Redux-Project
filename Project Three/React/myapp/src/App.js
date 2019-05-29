import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {Provider}  from 'react-redux';
import rootReducer from './reducers';
import Signup from './components/signup'
import Login from './components/login.js'
import Home from './components/homePage';

import '../src/vacations.css'
const store = createStore (
    rootReducer,
    applyMiddleware(logger,thunk)
  )

  class App extends React.Component {
    render() {
      return (
          <Router>
            <Provider store={store}>
            <div className="container">
                <Route exact path = "/" component={Signup}/>
                <Route exact path = "/login" component={Login}/>
                <Route exact path = "/home" component={Home}/>
            </div>
            </Provider>
        </Router>
      );
    }
  }

export default App;