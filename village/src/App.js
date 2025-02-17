import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {Route, NavLink} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
    .then(res => {
      this.setState({
        smurfs: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  updateSmurfs = (smurfs) => {
		this.setState({ smurfs })
	}
  
  render() {
    return (
      <div className="App">
          <div className="nav-links">
						<NavLink to="/" className='link'>Smurfs</NavLink>
						<NavLink to="/smurf-form" className='link'>New Smurf</NavLink>
					</div>

        <Route path="/smurf-form" exact render={(props) => <SmurfForm {...props} updateSmurfs={this.updateSmurfs} />} />
        <Route path="/" exact render={(props) => <Smurfs {...props} smurfs={this.state.smurfs} />} />


      </div>
    );
  }
}

export default App;
