import React from "react";
import { Component } from "react";

export default class ExpandedLine extends Component{
    render(){
        return <div className="card-line" style={{display: this.props.expanded ? "initial" : "none"}}>
        <span>{this.props.name}:</span> {this.props.value} <br />
    </div>
    }
}