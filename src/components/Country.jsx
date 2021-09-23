import React from "react";
import { Component } from "react";

export default class Country extends Component{
    render(){
        return <div className="countryCard">
            <div className="img-container"><img src={this.props.data.flags[1]} alt="" /></div>
            <div className="country-description">
                <h5>{this.props.data.name.common}</h5>
                <span>Area:</span> {this.props.data.area}km²<br />
                <span>Region:</span>       {this.props.data.region}<br /> 
                <span>Capital:</span> {this.props.data.capital ? this.props.data.capital : ""}
            </div>
        </div>
    }
}