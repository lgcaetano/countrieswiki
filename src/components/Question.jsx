import React from "react";
import { Component } from "react";

function getRandomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}



export default class Question extends Component{


    constructor(props){

        super(props)

        console.log(props.data[20])

        const randomIndexes = []
        let randomNumber 

        for(let i = 0; i < 4; i++){
            randomNumber = getRandomNumberBetween(0, props.data.length - 1)
            if(randomIndexes.includes(randomNumber)){
                console.log(randomNumber)
                i--
            }
            else
                randomIndexes.push(randomNumber)
        }

        this.state = { answerIndex: getRandomNumberBetween(0, 3),
                answerClasses: ["", "", "", ""], 
                questionOver: false,
                imgSrc: ""
            }


        this.state.answerCountry = props.data[randomIndexes[this.state.answerIndex]]
        this.state.imgSrc = this.state.answerCountry.flags[0]

        this.state.countryIndexes = randomIndexes

    }

    registerCorrectAnswer(){
        this.setState({ questionOver: true })
        console.log('resposta correta')
        this.props.userAnsweredCorrectly()
        this.setState({ answerClasses: this.state.answerClasses.map((currentClasses, index) => {
            if(index  === this.state.answerIndex)
                currentClasses += " correct-answer"
            return currentClasses
        }) })
    }

    registerWrongAnswer(wrongAnswerIndex){
        
        this.setState({ questionOver: true })
        
        this.props.userAnsweredWrong()

        this.setState({ answerClasses: this.state.answerClasses.map((currentClasses, index) => {
            if(index  === this.state.answerIndex)
                currentClasses += " correct-answer"
            else if(index  === wrongAnswerIndex)
                currentClasses += " wrong-answer"
            return currentClasses
        }) })
    }


    registerAnswer(index){
        if(this.state.questionOver)
            return
        if(this.state.answerIndex  === index)
            this.registerCorrectAnswer()
        else
            this.registerWrongAnswer(index) 
    }

    render(){
        console.log(this.state.answerClasses)

        return <div className="question-container">
            <div className="quiz-img-container">
                <img src={this.state.imgSrc} alt="" className="question-flag" />
            </div>
            <div className="question-words">
                <h5>To which country does this flag belong to?</h5>
               
                <div className="answers-container">
                    <div className={`question-answer ${this.state.answerClasses[0]} box-shadow`}
                        onClick={() => this.registerAnswer(0)}>
                        {this.props.data[this.state.countryIndexes[0]].name.common}
                    </div>
                    <div className={`question-answer ${this.state.answerClasses[1]} box-shadow`}
                        onClick={() => this.registerAnswer(1)}>
                        {this.props.data[this.state.countryIndexes[1]].name.common}
                    </div>
                    <div className={`question-answer ${this.state.answerClasses[2]} box-shadow`}
                        onClick={() => this.registerAnswer(2)}>
                        {this.props.data[this.state.countryIndexes[2]].name.common}
                    </div>
                    <div className={`question-answer ${this.state.answerClasses[3]} box-shadow`}
                        onClick={() => this.registerAnswer(3)}>
                        {this.props.data[this.state.countryIndexes[3]].name.common}
                    </div>
                </div>
            </div>
        </div>
    }
}