import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class TopBar extends Component{

    globeStyles = {
        marginRight: "10px",
        fontSize: "30px"
    }




    render(){
        return <div id="top-bar" className="box-shadow">
            <Link to="/" style={{ fontSize: "2rem" }}>
                <i className="fas fa-home"></i>
            </Link>
            <Link to="/quiz" style={{ fontSize: "1rem", lineHeight: "2rem", fontWeight: "800"}}>
                <i className="fas fa-gamepad" style={{ fontSize: "2rem", marginRight: "5px" }}></i> Play Flag Quiz!
            </Link>
            <h3><i className="fas fa-globe-americas" style={this.globeStyles}></i> Where in the world?</h3>
            <button id="dark-mode-toggle" onClick={() => this.props.toggleFunction()}><i className="fas fa-moon"></i> Dark Mode</button>
        </div>
    }
}