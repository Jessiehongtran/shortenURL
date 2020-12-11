import React from 'react';
import { Route } from 'react-router-dom';
import RedirectUrl from './components/redirect';
import CollectUrl from './components/collectUrl';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
   
  }



  render(){
    return (
      <div className="App">
        <Route 
        exact path="/"
        render = {
          props => {
            return (
              <>
                <CollectUrl {...props} />
              </>
            )
          }
        }
      />
        <Route 
        exact path="/:shortenUrl"
        render = {
          props => {
            return (
              <>
                <RedirectUrl {...props} />
              </>
            )
          }
        }
      />
      </div>
    );
  }
}

export default App;
