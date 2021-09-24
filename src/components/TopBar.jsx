import React from "react";
import { Component } from "react";

export default class TopBar extends Component{
    render(){
        return <div id="top-bar" className="box-shadow">
            <h3>Where in the world?</h3>
            <button id="dark-mode-toggle" onClick={() => this.props.toggleFunction()}><i className="fas fa-moon"></i> Dark Mode</button>
        </div>
    }
}