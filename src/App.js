import React, { Component } from 'react';
import './App.css';
import Today from './Today/Today';
import History from './History/History';
import { Offline } from 'react-detect-offline';

class App extends Component {  
  render() {
    return (
      <div className="">
              <div className="topheader">
                  <header className="container">
                      <nav className="navbar">
                          <div className="navbar-brand">
                              <span className="navbar-item">Cryptocurrency Rates</span>
                          </div>                          
                      </nav>
                  </header>
              </div>
              <div style={{ textAlign : 'center' }}>
                  <Offline>
                    <h2>You are currently offline. The information shown here may not be updated.</h2>
                  </Offline>
              </div>
              <section className="results--section">
                  <div className="container">
                      <h1>Real time price information about<br></br> BTC, ETH and LTC.</h1>
                  </div>
                  <div className="results--section__inner">
                      <Today />
                      <History />
                  </div>
              </section>
      </div>
    );
  }
}

export default App;
