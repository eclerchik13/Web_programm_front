import React,{useState, useEffect} from "react";
import {A} from "hookrouter";

function InformationUser(props){
    return(
        <div className={"info"}>
            <p>Login: {props.user.login}</p>
            Email: {props.user.email}
        </div>
    )
}

function InformationResult(props){
    let title = props.data.testTitle
    let attempt = props.data.attempt
    let grade = props.data.grade
    return(
        <p><div className={"LinkQuestion"}>
                <div className={"InfoTest"}>
                    <p>Title: {title}</p>
                    <p>Attempt: {attempt}</p>
                    <p>Grade: {grade}</p>
                </div>
        </div>
        </p>
    )
}

function Results(props){
    if(props.result === undefined || props.result.results === undefined){
        return(<h1>Loading</h1>)
    }
    return(
        props.result.results.map((item,index)=>{

            return(
                <div key={index}>
                    <InformationResult data={item}/>
                </div>
            )
        }))
}

function Account(){
    const [state, setState] = useState([])
    function getState(){
        fetch('/api/user',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        })
            .then((response =>{return response.json()}))
            .then(data => {
                {
                    console.log("Front1"+data)
                    setState(data)
                }
            })
    }
    useEffect(() => {
        getState()
    },[]);

    return(
        <div className="Account">
            <div className="head">Your account</div>
            <InformationUser user={state}/>
            <Results result={state}/>
        </div>
    )
}

export default Account