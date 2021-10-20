import React from "react";
import { Component } from "react";
import Question from "./Question";

export default class Quiz extends Component{

    constructor(props){
        super(props)
        this.state = {
            recordScore: !isNaN(localStorage.getItem("record")) ? parseInt(localStorage.getItem("record")) : 0,
            currentScore: 0,
            currentQuestion: null, 
            gameStarted: false,
            inBetweenQuestions: false,
            gameOver: false,
            pastAnswers: []
        }
    }

    getQuestion(){

        
        let newQuestion = <Question data={this.props.data} userAnsweredCorrectly={(country) =>this.registerCorrectAnswer(country)}
        userAnsweredWrong={(country) => this.registerWrongAnswer(country)} key={Math.random()} pastAnswers={this.state.pastAnswers}></Question>

        this.setState({ currentQuestion: newQuestion })
        this.setState({ inBetweenQuestions: false })
    }

    startGame(){
        this.setState({ gameStarted: true })
        this.getQuestion()
    }

    registerWrongAnswer(correctAnswer){
        
        this.state.pastAnswers.push(correctAnswer)

        this.setState({ gameOver: true })
    }

    registerCorrectAnswer(correctAnswer){

        this.state.pastAnswers.push(correctAnswer)

        this.setState({ currentScore: this.state.currentScore + 1, inBetweenQuestions: true}, () => this.checkRecord())
    }

    checkRecord(){
        if(this.state.currentScore > this.state.recordScore){
            this.setState({ recordScore: this.state.currentScore }, () => {
                localStorage.setItem("record", this.state.recordScore)
            })
        }
    }

    restart(){
        this.setState({ currentScore: 0, gameOver: false, pastAnswers: []})
        this.getQuestion()
    }

    render(){
        return <div className="quiz box-shadow">
            
            <div className={`scoreboard`}>
                <h3 className={`${this.state.gameStarted ? "" : "faded"}`}>Score: {this.state.currentScore}</h3>
                <h3>Record: {this.state.recordScore}</h3>
            </div>

            <div className={`initial-quiz-screen ${this.state.gameStarted ? "faded" : ""}`}>
                <h3 style={{fontSize: "2rem", textShadow: "3px 3px var(--boxshadow)"}}>Flag Quiz!</h3>
                <img src="https://images-na.ssl-images-amazon.com/images/I/61xqGLGBL3L.png" alt=""
                style={{ height: "75%", margin: "-8%", zIndex: "-1" }} />
                <button className="start-quiz-button" onClick={() => this.startGame()} >Start</button>
            </div>

            {this.state.currentQuestion}

            <button className={`quiz-button box-shadow ${this.state.inBetweenQuestions ? "" : "faded"}`} 
            onClick={() => this.getQuestion()}>Next Question <i className="fas fa-arrow-right"></i></button>

            <button className={`quiz-button box-shadow ${this.state.gameOver ? "" : "faded" }` } 
            onClick={() => this.restart()}><i className="fas fa-redo-alt"></i> Restart</button>
        </div>
    }
}