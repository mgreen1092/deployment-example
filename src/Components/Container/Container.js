import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SymbolSearch from "./SymbolSearch/SymbolSearch";
import KeyData from "./KeyData/KeyData";
import Articles from "./Articles/Articles";
import Graph from './Graph/Graph'
import './Container.css'

function Container () {
    const [keyData, setKeyData] = useState({})
    const [articles, setArticles] = useState([])
    const [graphData, setGraphData] = useState([])
    function getKeyData (key) {
        console.log(key)
        //need to interpolate the symbol name selected - where IBM is now
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${key}&apikey=L9CIXKF2CPVF19PV`).then((response) => {
            console.log(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${key}&apikey=L9CIXKF2CPVF19PV`)
            console.log(response.data)
            if (response.data.Note) {
                alert('Too many calls')
            } else if (response.data === {}) {
                alert('No data')
            }
            setKeyData(response.data)
            // setKeyData({...keyData, response['data']})
            console.log(keyData)
            //getValues()
            //getNewsArticles(keyData)
        })
    }
    console.log(keyData.Description, 'Description Key')
    console.log(keyData)
    function getNewsArticles (key) {
        axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${key}&topics=technology&apikey=L9CIXKF2CPVF19PV.`).then((response) => {
            console.log(response.data)
            setArticles(response.data.feed)
        })
        }
    function graph (symbol) {
        axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=8fbbb93916fd4d0bb531696e24ca8115`).then((response) => {
            console.log(response.data.values)
            setGraphData(response.data.values)
        })
    }
    console.log(graphData)
    return (
        <div>
            <SymbolSearch graph={graph} getNewsArticles={getNewsArticles} getKeyData={getKeyData}/>
            <KeyData setGraphData={setGraphData} setKeyData={setKeyData} keyData={keyData}/>
            <Graph graphData={graphData}/>
            <Articles articles={articles}/>
        </div>
    )
}

export default Container
