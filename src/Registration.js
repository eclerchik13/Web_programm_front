import React, {useState} from "react";
import {InputField, ButtonInput, NotEntry} from "./components/input";
import {navigate} from "hookrouter"

function Registration(){
    const [state, setState] = useState({
        email:"",
        login:"",
        password:""
    })
    function CreateUser(){
        fetch('/api/user',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({login: state.login, email: state.email, password: state.password}),
        })
            .then(response => {return response.json();})
            .then(data => {
                if(data.message === "Registration"){
                    navigate('/login')
                }
                else{
                    alert('Error with registration');
                }

            })
    }
    const submit = (e) => {
        e.preventDefault();
        //alert(JSON.stringify(state));
        CreateUser();
    }
    return(
        <div className="Registration">
            <div className="head">Registration</div>
            <InputField name="email"   onChange={e =>(
                setState({...state,email:e.target.value})
            )}/>
            <InputField name="name"  onChange={e =>(
                setState({...state,login:e.target.value})
            )}/>
            <InputField name="password"  onChange={e =>(
                setState({...state,password:e.target.value})
            )}/>

            <ButtonInput function={"Register"} onClick={submit}/>
            <NotEntry text={"Do you have an account?"}
                      link={"login"}
                      function={"Sign In"}/>
        </div>
    )
}

export default Registration
