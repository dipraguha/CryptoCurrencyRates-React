import React, { Component } from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';
import localforage from 'localforage';

class History extends Component{
    constructor(){
        super();
        this.state = {
            todayPrice: {},
            yesterdayPrice: {},
            twoDaysPrice: {},
            threeDaysPrice: {},
            fourDaysPrice: {}
        }

        this.getBTCPrices = this.getBTCPrices.bind(this);
        this.getETHPrices = this.getETHPrices.bind(this);
        this.getLTCPrices = this.getLTCPrices.bind(this);
        this.storeInIndexedDB = this.storeInIndexedDB.bind(this);
    }

    getETHPrices(date){
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
    }

    getBTCPrices(date){
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
    }

    getLTCPrices(date){
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
    }    

    getTodayPrice(){
        if(navigator.onLine){      
            let dt = moment().unix();        
            axios.all([this.getBTCPrices(dt), this.getETHPrices(dt), this.getLTCPrices(dt)])
                .then(axios.spread((btc, eth, ltc) => {
                    let price = {
                        date: moment.unix(dt).format("MMMM Do YYYY"),
                        eth: eth.data.ETH.USD,
                        btc: btc.data.BTC.USD,
                        ltc: ltc.data.LTC.USD
                    }
                    this.setState({
                        todayPrice: price
                    });
                    this.storeInIndexedDB('todayPrice', JSON.stringify(price));
                }
            ));
        }
        else{
            localforage.getItem('todayPrice').then(value => {
                this.setState({todayPrice : JSON.parse(value)});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    getYesterdayPrice(){
        if(navigator.onLine){               
            let dt = moment().subtract(1, 'days').unix();        
            axios.all([this.getBTCPrices(dt), this.getETHPrices(dt), this.getLTCPrices(dt)])
                .then(axios.spread((btc, eth, ltc) => {
                    let price = {
                        date: moment.unix(dt).format("MMMM Do YYYY"),
                        eth: eth.data.ETH.USD,
                        btc: btc.data.BTC.USD,
                        ltc: ltc.data.LTC.USD
                    }
                    this.setState({
                        yesterdayPrice: price
                    });
                    this.storeInIndexedDB('yesterdayPrice', JSON.stringify(price));
                }
            ));
        }
        else{
            localforage.getItem('yesterdayPrice').then(value => {
                this.setState({yesterdayPrice : JSON.parse(value)});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    getTwoDaysPrice(){
        if(navigator.onLine){
            let dt = moment().subtract(2, 'days').unix();        
            axios.all([this.getBTCPrices(dt), this.getETHPrices(dt), this.getLTCPrices(dt)])
                .then(axios.spread((btc, eth, ltc) => {
                    let price = {
                        date: moment.unix(dt).format("MMMM Do YYYY"),
                        eth: eth.data.ETH.USD,
                        btc: btc.data.BTC.USD,
                        ltc: ltc.data.LTC.USD
                    }
                    this.setState({
                        twoDaysPrice: price
                    });
                    this.storeInIndexedDB('twoDaysPrice', JSON.stringify(price));
                }
            ));
        }
        else{
            localforage.getItem('twoDaysPrice').then(value => {
                this.setState({twoDaysPrice : JSON.parse(value)});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    getThreeDaysPrice(){
        if(navigator.onLine){
            let dt = moment().subtract(3, 'days').unix();        
            axios.all([this.getBTCPrices(dt), this.getETHPrices(dt), this.getLTCPrices(dt)])
                .then(axios.spread((btc, eth, ltc) => {
                    let price = {
                        date: moment.unix(dt).format("MMMM Do YYYY"),
                        eth: eth.data.ETH.USD,
                        btc: btc.data.BTC.USD,
                        ltc: ltc.data.LTC.USD
                    }
                    this.setState({
                        threeDaysPrice: price
                    });
                    this.storeInIndexedDB('threeDaysPrice', JSON.stringify(price));
                }
            ));
        }
        else{
            localforage.getItem('threeDaysPrice').then(value => {
                this.setState({threeDaysPrice : JSON.parse(value)});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    getFourDaysPrice(){
        if(navigator.onLine){
            let dt = moment().subtract(4, 'days').unix();        
            axios.all([this.getBTCPrices(dt), this.getETHPrices(dt), this.getLTCPrices(dt)])
                .then(axios.spread((btc, eth, ltc) => {
                    let price = {
                        date: moment.unix(dt).format("MMMM Do YYYY"),
                        eth: eth.data.ETH.USD,
                        btc: btc.data.BTC.USD,
                        ltc: ltc.data.LTC.USD
                    }
                    this.setState({
                        fourDaysPrice: price
                    });
                    this.storeInIndexedDB('fourDaysPrice', JSON.stringify(price));
                }
            ));
        }
        else{
            localforage.getItem('fourDaysPrice').then(value => {
                this.setState({fourDaysPrice : JSON.parse(value)});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    componentWillMount(){
        this.getTodayPrice();
        this.getYesterdayPrice();
        this.getTwoDaysPrice();
        this.getThreeDaysPrice();
        this.getFourDaysPrice();
    }

    storeInIndexedDB(key, value){
        localforage.setItem(key, value).then(function(value){})
            .catch(function(error){
                console.log(error);
            });        
    }

    render() {
        return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <div className="history--section__box">
                    <div className="history--section__box__inner">
                        <h4>{this.state.todayPrice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.todayPrice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.todayPrice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.todayPrice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.yesterdayPrice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.yesterdayPrice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.yesterdayPrice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.yesterdayPrice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.twoDaysPrice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.twoDaysPrice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.twoDaysPrice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.twoDaysPrice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.threeDaysPrice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.threeDaysPrice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.threeDaysPrice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.threeDaysPrice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.fourDaysPrice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.fourDaysPrice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.fourDaysPrice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.fourDaysPrice.ltc}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default History;