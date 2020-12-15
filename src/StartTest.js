import React, {useState} from 'react'
import {navigate} from "hookrouter";
import {LinkQuestion} from "./components/input";

function Questions(){
    return(
        <div className={"AllQuestions"}>
            <div className={"head"}>Все тесты</div>
            <div className={"InfoAboutSubject"}>Выбирете тест, который хотите пройти.</div>
            <LinkQuestion id={"1"} name={"Физика"} time={"11"} number={"5"} />
            <LinkQuestion id={"2"} name={"Физика"} time={"10"} number={"10"} />
        </div>
    )
}

export {Questions}