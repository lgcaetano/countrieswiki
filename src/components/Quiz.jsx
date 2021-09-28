import React from "react";
import { Component } from "react";
import Question from "./Question";

export default class Quiz extends Component{

    constructor(props){
        super(props)
        this.state = {
            recordScore: 0,
            currentScore: 0,
            currentQuestion: null, 
            gameStarted: false,
            inBetweenQuestions: false,
            gameOver: false
        }
    }

    getQuestion(){

        
        let newQuestion = <Question data={this.props.data} userAnsweredCorrectly={() =>this.registerCorrectAnswer()}
        userAnsweredWrong={() => this.registerWrongAnswer()} key={Math.random()}></Question>
        
        console.log(newQuestion, this.state.currentQuestion)

        this.setState({ currentQuestion: newQuestion })
        this.setState({ inBetweenQuestions: false })
    }

    startGame(){
        this.setState({ gameStarted: true })
        this.getQuestion()
    }

    registerWrongAnswer(){
        this.setState({ gameOver: true })
    }

    registerCorrectAnswer(){
        this.setState({ currentScore: this.state.currentScore + 1, inBetweenQuestions: true}, () => {
            this.setState({ recordScore: this.state.currentScore > this.state.recordScore ? this.state.currentScore : this.state.recordScore })
        })
    }

    restart(){
        this.setState({ currentScore: 0, gameOver: false })
        this.getQuestion()
    }

    render(){
        return <div className="quiz box-shadow">
            
            <div className={`scoreboard ${this.state.gameStarted ? "" : "faded"}`}>
                <h3>Score: {this.state.currentScore}</h3>
                <h3>Record: {this.state.recordScore}</h3>
            </div>

            <div className={`initial-quiz-screen ${this.state.gameStarted ? "faded" : ""}`}>
                <h3 style={{fontSize: "2rem"}}>Flag Quiz!</h3>
                <img src="https://images-na.ssl-images-amazon.com/images/I/61xqGLGBL3L.png" alt=""
                style={{ height: "75%", margin: "-8%", zIndex: "-1" }} />
                <button className="start-quiz-button" onClick={() => this.startGame()} >Start</button>
            </div>

            {this.state.currentQuestion}

            <button className={`quiz-button ${this.state.inBetweenQuestions ? "" : "faded"}`} 
            onClick={() => this.getQuestion()}>Next Question <i className="fas fa-arrow-right"></i></button>

            <button className={`quiz-button ${this.state.gameOver ? "" : "faded" }` } 
            onClick={() => this.restart()}><i className="fas fa-redo-alt"></i> Restart</button>
        </div>
    }
}