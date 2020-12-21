import React ,{useState} from 'react'
import {navigate} from "hookrouter"
import {ButtonInput, InputField, QuestCard} from "./components/input";

function CreateTest(){
    const [state, setState] = useState({
        title: "",
        count: 0,
        questions: [],
        answers:[],
        time: ""
    })

    function CreateNewTest(){
        fetch('/api/add',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                title: state.title,
                count: state.count,
                questions: state.questions,
                time: state.time,
                answers: state.answers
            }),
        })
            .then(response => {return response.json();})
            .then(data => {
                if(data.message === "Test saved"){
                    navigate('/')
                }
                else{
                    console.error('Error with create test');//может navigate error with message
                }

            })
    }

    const submit = (e) => {
        e.preventDefault();
        CreateNewTest();
    }

    const ChangeName = (e) => {
        setState({...state, title: e.target.value})
    }

    const ChangeTime = (e) => {
        setState({...state, time: e.target.value})
    }

    const ChangeNumber = (e) => {
        let newNumber = Number(e.target.value)
        let array = [...state.questions]
        let array_2 = [...state.answers]

        if (newNumber > state.count) {
            for (let i = 0; i < newNumber - state.count; i++) {
                array.push(
                    {body: "No body"}
                )
                array_2.push(
                    {answer: ""}
                )
            }
        }else{
            array.splice(-(state.count - newNumber),state.count - newNumber)
            array_2.splice(-(state.count - newNumber),state.count - newNumber)
        }

        setState({...state,
            count: newNumber,
            questions: array,
            answers: array_2
        })
    }

    const SetQuestion = index => e =>{
        let newState = state;
        newState.questions[index].body = e.target.value;
        setState(newState)
    }

    const SetAnswer = index => e =>{
        let newState = state;
        newState.answers[index].answer = e.target.value;
        setState(newState)
    }

    return(
        <div className={"CreateTest"}>
            <div className="head">Create test</div>
            <InputField name="Title" onChange={ChangeName}/>
            <InputField name="Time" onChange={ChangeTime}/>
            <InputField name="Count" onChange={ChangeNumber}/>
            {
                state.questions.map((q, i) => {
                    return (<p><QuestCard onChangeQuestion={SetQuestion(i)} onChangeAnswer={SetAnswer(i)}/></p>)
                })
            }
            <ButtonInput function={"Send"} onClick={submit}/>
        </div>
    )
}

export {CreateTest}