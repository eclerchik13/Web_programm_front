import React,{useState} from "react";
import {InputField, ButtonInput, NotEntry}  from "./components/input.js";
import {navigate} from "hookrouter"

function SignIn(){
    const [state, setState] = useState({
        login:"",
        password:""
    })
    function Auth(){
        fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({login: state.login,password:state.password}),
        })
            .then(response => {return response.json();})
            .then(data => {
                if (data.message === 'You auth user'){
                    navigate('/');
                }
                else {
                    console.error('Error with login!')
                }
            }
            )}
    const submit = (e) => {
        e.preventDefault();
        Auth();
    }
    return(
        <div className="Login">
            <div className="head">Sign In</div>
                <InputField name={"login"} onChange={e => (
                    setState({...state,login:e.target.value})
                )} />
                <InputField name={"password"} onChange={e => (
                    setState({...state,password:e.target.value})
                )}/>

            <ButtonInput function={"Sign In"} onClick={submit}/>
            <NotEntry text={"Don't have an account?"}
                      link={"register"}
                      function={"Register"}/>
        </div>
    )
}

export default SignIn;