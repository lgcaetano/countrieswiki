import React from "react";
import { Component } from "react";
import Select from "react-select";

export default class SearchSort extends Component{

    sortOptions = [
        { value: "", label: "All"},
        { value: 'Africa', label: 'Africa'},
        { value: 'Americas', label: 'Americas'},
        { value: 'Antarctic', label: 'Antarctic'},
        { value: 'Asia', label: 'Asia'},
        { value: 'Europe', label: 'Europe'},
        { value: 'Oceania', label: 'Oceania'},
      ]

    orderOptions = [
        {value: "az", label: "A-Z" },
        {value: "za", label: "Z-A" },
        {value: "region", label: "by Region" },
        {value: "area", label: "by Area" },
    ]

    selectStyles = {
        control: (styles, state) => ({ ...styles, width: '175px', height: '100%', fontWeight: '600',
         border: state.isFocused ? "2px solid white" : "0", borderColor: "white",
         outline: "none",
         "&:hover" : {
             border: "2px solid white",
             boxShadow: "none"
         },
         "&:focus" : {
            border: "2px solid white",
            boxShadow: "none",
            outline: "none"
         }
    }),
        option: styles => ({ ...styles, color: this.props.darkMode ? 'white' : 'black'})
    }


    render(){
        return <div className="search-sort-container">
            <input type="search" name="search" id="search-bar" placeholder="Search..." onChange={this.props.searchFunction} className="box-shadow"/>
            <Select options={this.orderOptions} styles={this.selectStyles} placeholder="Sort..." 
            onChange={this.props.onChangeSort} className="box-shadow" ></Select>
            <Select options={this.sortOptions} styles={this.selectStyles} placeholder="Filter by region" 
            onChange={this.props.onChange} className="box-shadow"></Select>
        </div>
    }
}