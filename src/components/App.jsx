import React from "react";
import { Component } from "react";
import Country from "./Country";
import SearchSort from "./SearchSort";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import TopBar from "./TopBar";

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
        return -1
    if(a.area < b.area)
        return 1
}





export default class App extends Component{

    constructor(props){
        
        super(props)
        
        const settings = {
            method: 'GET',
            timeout: 0
        }

        const loaderCss = css`
        margin: auto auto;
        grid-column: span 4;
        position: relative;
        top: 30vh;
        `;

        this.state = { expandedCountry: false, countriesComponents: <BeatLoader css={loaderCss} size={50}></BeatLoader>, darkMode: false }
        fetch('https://restcountries.com/v3/all', settings)
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => this.setState({ countriesArray: response.sort(sortCountries) }, () => this.organizeCountries()))
            .then(() => console.log((this.state.countriesArray[20])))
        
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
        console.log(value)


        this.setState( { countriesComponents: this.state.countriesArray.filter(country => {
            if(!value)
                return true
            if(country.name.common.toLowerCase().includes(value.toLowerCase()))
                return true
            else
                return false
        }).map(country => {
            return <Country key={country.name.common} data={country} 
            clickHandleFunction={country => this.expandCountry(country)}
            getName={country => this.getName(country)} borderClick={country => this.borderClick.bind(this)(country)}></Country>
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
            return <Country key={country.name.common} data={country} 
            clickHandleFunction={country => this.expandCountry(country)}
            getName={country => this.getName(country)} borderClick={country => this.borderClick.bind(this)(country)}></Country>
        })} )
    }

    getName(countryDigits){
        return this.state.countriesArray.find(country => {
            return country.cca3 == countryDigits
        }).name.common
    }


    organizeCountries(){
        // console.log('HEY')
        this.setState({ countriesComponents: this.state.countriesArray.map(country => {
            return <Country key={country.name.common} data={country} 
            clickHandleFunction={country => this.expandCountry(country)}
            getName={country => this.getName(country)} borderClick={country => this.borderClick.bind(this)(country)}></Country>
        }) })
    }

    borderClick(countryName){

        // console.log(this)

        // console.log(countryName)

        const countryObject = this.state.countriesArray.find(country => {
            return country.name.common == countryName
        })

        this.setState({ countriesComponents: [<Country key={countryName} data={countryObject} 
            clickHandleFunction={country => this.expandCountry(country)}
            getName={country => this.getName(country)} borderClick={country => this.borderClick.bind(this)(country)}
            countryShouldBeExpanded={true}></Country>] })
    }

    expandCountry(country){
        this.setState({ expandedCountry: true })
        this.searchCountries(country)
    }

    reorganizeCountries(){

        this.setState({ countriesComponents: "", expandedCountry: false }, () => {
            this.organizeCountries()
        })
    }

    toggleDarkMode(){
        this.setState({ darkMode: !this.state.darkMode })
    }

    render(){
        // console.log(this.state.countriesComponents)

        return <div id="base" className={this.state.darkMode ? "dark-mode" : ""}>
            <TopBar toggleFunction={() => this.toggleDarkMode()}/>
            <SearchSort searchFunction={e => this.searchCountries.bind(this)(e.target.value)} darkMode={this.state.darkMode}
            onChange={e => this.filterCountries(e.value)} onChangeSort={e => this.orderCountries(e.value)}></SearchSort>
            
            <button id="go-back" className="box-shadow" 
            style={{ display: this.state.expandedCountry ? 'initial' : 'none' }}
            onClick={() => this.reorganizeCountries()}><i className="fas fa-arrow-left"></i> Back</button>
            
            <div className="countries-grid">{this.state.countriesComponents}</div>
        </div>
    }
}