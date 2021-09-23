import React from "react";
import { Component } from "react";
import Country from "./Country";
import SearchSort from "./SearchSort";

function sortCountries(a, b){
    if(a.name.common == b.name.common)
        return 0
    if(a.name.common > b.name.common)
        return 1
    if(a.name.common < b.name.common)
        return -1
}


function invertedSortCountries(a, b){
    if(a.name.common == b.name.common)
        return 0
    if(a.name.common > b.name.common)
        return -1
    if(a.name.common < b.name.common)
        return 1
}
function sortCountriesRegions(a, b){
    if(a.region == b.region)
        return 0
    if(a.region > b.region)
        return 1
    if(a.region < b.region)
        return -1
}
function sortCountriesArea(a, b){
    if(a.area == b.area)
        return 0
    if(a.area > b.area)
        return 1
    if(a.area < b.area)
        return -1
}





export default class App extends Component{

    constructor(props){
        const settings = {
            method: 'GET',
            timeout: 0
        }
        super(props)
        this.state = {}
        fetch('https://restcountries.com/v3/all')
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => this.setState({ countriesArray: response.sort(sortCountries) }, () => this.organizeCountries()))
            .then(() => console.log((this.state.countriesArray[0])))
        
            // console.log(this.state.countriesArray)
        
    }

    sortFunctions = {
        az: sortCountries,
        za: invertedSortCountries,
        region: sortCountriesRegions,
        area: sortCountriesArea
    }

    orderCountries(value){
        this.state.countriesArray.sort(this.sortFunctions[value])
        this.organizeCountries()
    }

    searchCountries(value){
        this.setState( { countriesComponents: this.state.countriesArray.filter(country => {
            if(!value)
                return true
            if(country.name.common.toLowerCase().includes(value.toLowerCase()))
                return true
            else
                return false
        }).map(country => {
            return <Country key={country.name.common} data={country}></Country>
        })} )
    }

    filterCountries(value){
        // console.log(this.state.countriesArray[0].name.common)
        this.setState( { countriesComponents: this.state.countriesArray.filter(country => {
            if(!value)
                return true
            if(country.region == value)
                return true
            else
                return false
        }).map(country => {
            return <Country key={country.name.common} data={country}></Country>
        })} )
    }


    organizeCountries(){
        // console.log('HEY')
        this.setState({ countriesComponents: this.state.countriesArray.map(country => {
            return <Country key={country.name.common} data={country}></Country>
        }) })
    }

    render(){
        return <div>
            <SearchSort searchFunction={e => this.searchCountries.bind(this)(e.target.value)} 
            onChange={e => this.filterCountries(e.value)} onChangeSort={e => this.orderCountries(e.value)}></SearchSort>
            <div className="countries-grid">{this.state.countriesComponents}</div>
        </div>
    }
}