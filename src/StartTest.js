import React, {useState,useEffect} from 'react'
import {A, navigate} from "hookrouter";

function LinkQuestion(props){
    let id = props.data.id;
    let title = props.data.title;
    let time = props.data.time;
    let count = props.data.count;
    return(
        <p><div className={"LinkQuestion"}>
            <A href={"/test/"+id}>
                <div className={"InfoTest"}>
                    <p>Name: {title}</p>
                    <p>Number of questions: {count}</p>
                    <p>Time: {time+" seconds"}</p>
                </div>
            </A>
        </div>
        </p>
    )
}

function Questions(props){
    let newTemple = props.data.map((item,index) => {
        return(
            <div key={index}>
                <LinkQuestion data={item}/>
            </div>
        )
    })
    return(
        <div className={"AllQuestions"}>
            <div className={"head"}>Все тесты</div>
            <div className={"InfoAboutSubject"}>Выбирете тест, который хотите пройти.</div>
            {newTemple}
        </div>
    )
}

function GetQuestions(){
    const [tests,setTests] = useState([]);
    function getTests(){
        fetch('/api/tests',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        })
            .then((response =>{return response.json()}))
            .then(data => {
                {
                    setTests(data)
                }
            })
    }
    useEffect(() => {
        getTests()
    },[]);
    return (
        <Questions data={tests}/>
    );
}

export {Questions, GetQuestions}