import React from "react";
import { Component } from "react";
import ExpandedLine from "./ExpandedLine";
import Borders from "./Borders";

export default class Country extends Component{

    constructor(props){
        super(props)
        this.state = {
            expandedFlag: props.countryShouldBeExpanded ? true : false
        }
    }
    
    expand(){
        if(this.state.expandedFlag)
            return
        this.setState({ expandedFlag: 1 }, () => this.props.clickHandleFunction(this.props.data.name.common))
        
    }

    render(){

        const nativeNames = this.props.data.name.nativeName
        let nativeName = ""

        if(nativeNames){
            nativeName = nativeNames[Object.keys(nativeNames)[0]].common ? 
            nativeNames[Object.keys(nativeNames)[0]].common : this.props.data.name.common
        }

        let languages = this.props.data.languages ? Object.values(this.props.data.languages).join(", ") : ""

        let countryDomain = this.props.data.tld ? this.props.data.tld[0] : ""

        return <div className={`countryCard box-shadow ${this.state.expandedFlag ? "expanded-card" : ""}`} onClick={() => this.expand()}>
            <div className="img-container"><img src={this.props.data.flags[1]} alt="" /></div>
            <div className="country-description">
                
                <h5>{this.props.data.name.common}</h5>
                
                <ExpandedLine name="Native name" value={nativeName} expanded={this.state.expandedFlag}/>
                
                <div className="card-line">
                    <span>Area:</span> {this.props.data.area}km²<br />
                </div>
                
                <div className="card-line">
                    <span>Region:</span>       {this.props.data.region}<br />
                </div>
                
                <ExpandedLine name="Sub region" value={this.props.data.subregion} expanded={this.state.expandedFlag}/>
                
                <ExpandedLine name="Top Level Domain" value={countryDomain} expanded={this.state.expandedFlag}/>
                
                <div className="card-line">
                    <span>Capital:</span> {this.props.data.capital ? this.props.data.capital : ""}
                </div>

                <ExpandedLine name="Languages" value={languages} expanded={this.state.expandedFlag}/>

                <ExpandedLine name="Borders" value={this.props.data.borders ? <Borders 
                borderCountries={this.props.data.borders} borderClick={this.props.borderClick}
                getName={this.props.getName}/> : ""} expanded={this.state.expandedFlag}  />

            </div>
        </div>
    }
}