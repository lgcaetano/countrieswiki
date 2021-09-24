import React from "react";
import { Component } from "react";

export default class Borders extends Component{
    constructor(props){
        super(props)

        
        this.state = {
            buttons: this.props.borderCountries.map(country => {
                
                let countryName = this.props.getName(country)

                return <button className="border-button" onClick={() => this.props.borderClick(countryName)} key={country}>
                    {countryName}
                </button>
            })
        }
    }

    render(){
        return <div id="borders-container">
            {this.state.buttons}
        </div>
    }
}