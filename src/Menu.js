import React from "react";
import {A} from "hookrouter"

function Menu(){
    return(
        <div className={"Menu"}>
            <A href={"/"} className={"m"}>Main Page</A>
            <A href={"/account"} className={"m"}>Account</A>
            <A href={"/login"} className={"m"}>Sign In</A>
            <A href={"/tests"} className={"m"}>Tests</A>
        </div>
    )
}

export default Menu