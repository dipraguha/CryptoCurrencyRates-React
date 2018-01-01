import React, { Component } from 'react';
import './Today.css';
import axios from 'axios';
import localforage from 'localforage';

class Today extends Component{
    constructor(){
        super();
        this.state = {
            btcPrice : '',
            ltcPrice : '',
            ethPrice : '',
            intervalId: null
        };

        this.getCurrentRates = this.getCurrentRates.bind(this);
        this.storeInIndexedDB = this.storeInIndexedDB.bind(this);        
    }

    getCurrentRates(){
        if(navigator.onLine){
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
                .then(response => {
                    this.setState({btcPrice : response.data.BTC.USD});
                    this.storeInIndexedDB('BTC', response.data.BTC.USD);

                    this.setState({ltcPrice : response.data.LTC.USD});
                    this.storeInIndexedDB('LTC', response.data.LTC.USD);
                    
                    this.setState({ethPrice : response.data.ETH.USD});
                    this.storeInIndexedDB('ETH', response.data.ETH.USD);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else{
            localforage.getItem('BTC').then(value => {
                this.setState({btcPrice : value});
            }).catch(error => {
                console.log(error);
            });

            localforage.getItem('LTC').then(value => {
                this.setState({ltcPrice : value});
            }).catch(error => {
                console.log(error);
            });

            localforage.getItem('ETH').then(value => {
                this.setState({ethPrice : value});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    componentWillMount(){        
        this.getCurrentRates();        
    }

    componentDidMount(){
        let intervalId = setInterval(this.getCurrentRates, 10000);
        this.setState({
            intervalId : intervalId
        });
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    storeInIndexedDB(key, value){
        localforage.setItem(key, value).then(function(value){})
            .catch(function(error){
                console.log(error);
            });        
    }

    render(){
        return(
            <div className = "today--section container">
                <h2>Current Price</h2>
                    <div className="columns today--section__box">
                        <div className="column btc--section">
                            <h5>${this.state.btcPrice}</h5>
                            <p>1 BTC</p>
                        </div>
                        <div className="column eth--section">
                            <h5>${this.state.ethPrice}</h5>
                            <p>1 ETH</p>
                        </div>
                        <div className="column ltc--section">
                            <h5>${this.state.ltcPrice}</h5>
                            <p>1 LTC</p>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Today;