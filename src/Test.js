import React, {useState, useEffect} from 'react'
import {ButtonInput, InputField} from "./components/input";
import {navigate} from "hookrouter";

function InputQuestion(props){ //Enter answers
    return(
        <div className={"Question"}>
            <div className={"InfoAboutSubject"}>{props.body}</div>
            <InputField name={"Answer: "} class={"InputQuestion"} onChange={props.onChange}/>
        </div>
    )
}

///////////// - Test with questions and fields for answers - ////////

function Test(props){ //props.data
    let array = [];
    for (let i=0; i < props.data.count;i++){
        array.push({
            answer:""
        })
    }
    const[answers,setAnswers] = useState(array)

    function SendAnswers(){
        fetch('/api/test/'+props.data.id,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                userAnswers: answers
            }),
        })
            .then(response => {return response.json();})
            .then(data => {
                if(data.message === "Answers saved"){
                    navigate('/')//перенаправить на страницу пользователя
                }
                else if (data.message === "Error: Saving result"){
                    //navigate('/error')//может navigate error with message
                    console.error(data.message)
                }
            })
    }

    const submit = (e) => {
        e.preventDefault();
        SendAnswers(answers)
    }

    const ChangeAnswer = index => e =>{
        let newState = answers;
        newState[index].answer = e.target.value;
        setAnswers(newState)
    }

    return(
        <div className={"Test"}>
            <div className={"head"}>
                {props.data.title}
            <p><Time ctime={props.data.time} onTimeOut={SendAnswers}/></p>
            </div>
            {
                props.data.questions.map((item,index)=>{
                    return(
                        <p>
                            <InputQuestion body={item.body} onChange={ChangeAnswer(index)}/>
                        </p>
                    )
                })
                 }
            <ButtonInput function={"Send"} onClick={submit}/>
            </div>
    )
}

////////// - Main page with start test - /////////

function Start(props){
    const[test,setTest] =useState([])
    function getTest(){
        fetch('/api/test/'+props.id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        })
            .then((response =>{return response.json()}))
            .then(data => {
                {
                    setTest(data)
                }
            })
    }
    useEffect(() => {
        getTest()
    },[]);

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
            {state.addTest && <Test data={test}/>}
        </div>
    )
}

///////////// - function Time - ////////////////

const padTime = time =>{
    return String(time).length === 1 ? `0${time}`: `${time}`;
}

const format = time =>{
    const minutes = Math.floor(time/60);

    const seconds = time % 60;

    return `${minutes}:${padTime(seconds)}`;
}

function Time(props){
    let data = props.ctime
    const [counter, setCounter] = useState(data);
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
            {counter === 0 ? props.onTimeOut() : <div>Time:{format(counter)}</div> }
        </div>
    )
}

export {Start}