import React, {useState, useEffect} from 'react'
import {ButtonInput, InputField} from "./components/input";

const padTime = time =>{
    return String(time).length === 1 ? `0${time}`: `${time}`;
}

const format = time =>{
    const minutes = Math.floor(time/60);

    const seconds = time % 60;

    return `${minutes}:${padTime(seconds)}`;
}

function Time(props){
    const [counter, setCounter] = useState(props.time);
    useEffect(() => {
        let timer;
        if (counter > 0) {
            timer = setTimeout(() => setCounter(counter-1),1000)
        }
        return() => {
            if (timer){
                clearTimeout(timer)
            }
        }
    },[counter]);

    return(
        <div className={"Timer"}>
            {counter === 0 ? "Time over" : <div>Time:{format(counter)}</div> }
        </div>
    )
}

function InputQuestion(props){
    return(
        <div className={"Question"}>
            <div className={"InfoAboutSubject"}>{props.body}</div>
            <InputField name={"Answer: "} class={"InputQuestion"} onChange={props.onChange}/>
        </div>
    )
}

function Test(){
    const [state, setState] = useState({
        questions:[
            {
                question: "WTF"
            },
            {
                question: "LOL"
            }
        ],
        answers:[
            {
                answer: ""
            },
            {
                answer: ""
            }
        ]
    })

    const submit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(state));
    }

    const ChangeAnswer = index => e=>{
        let oldState = state;
        oldState.answers[index].answer = e.target.value;
        setState(oldState)
    }

    return(
        <div className={"Test"}>
            <div className={"head"}>
                Test
            <p><Time time={"660"}/></p>
            </div>
        <p><InputQuestion body={state.questions[0].question} onChange={ChangeAnswer(0)}/></p>

            <p><InputQuestion body={state.questions[1].question} onChange={ChangeAnswer(1)}/></p>

            <ButtonInput function={"Send"} onClick={submit}/>
            </div>
    )
}

function Start(){
    const [state, setState] = useState({
        addTest: false
    })

    const handleClick = () =>{
        setState({addTest: true})
    }
    return(
        <div className="Start">
            <div className="head">Ready to start?</div>
            <button className={'M'} onClick={handleClick}>Start</button>
            {state.addTest && <Test />}
        </div>
    )
}

export {Start}