import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Borders extends Component{
    constructor(props){
        super(props)

        
        this.state = {
            buttons: this.props.borderCountries.map(country => {
                
                let countryName = this.props.getName(country)

                return <Link to={`/${country}`}className="border-button" key={country}>
                    {countryName}
                </Link >
            })
        }
    }

    render(){
        return <div id="borders-container">
            {this.state.buttons}
        </div>
    }
}