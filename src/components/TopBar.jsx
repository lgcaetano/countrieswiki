import React from "react";
import { Component } from "react";

export default class TopBar extends Component{

    globeStyles = {
        marginRight: "10px",
        fontSize: "30px"
    }




    render(){
        return <div id="top-bar" className="box-shadow">
            <h3><i class="fas fa-globe-americas" style={this.globeStyles}></i> Where in the world?</h3>
            <button id="dark-mode-toggle" onClick={() => this.props.toggleFunction()}><i className="fas fa-moon"></i> Dark Mode</button>
        </div>
    }
}