import React from "react";
import {A} from "hookrouter";

function InputField(props){
    return(
        <form className={"Input_info"}>
            <label><p></p>
                <input name={props.name} type={"text"} placeholder={props.name} onChange={props.onChange} className={props.class}/>
            </label>
        </form>
    )
}

function ButtonSend(props){
    return(
        <A href={'/'+props.link} className={'M'}>{props.function}</A>
    )
}

function ButtonInput(props){
    return(
        <div className={"Button_Input"}>
        <p><input type="submit" onClick={props.onClick} value={props.function}/></p>
        </div>
    )
}

function NotEntry(props){
    return(
        <div className="littleText">{props.text}
            <A href={"/"+props.link} className="c">{props.function}</A>
        </div>
    )
}

function QuestCard(props){
    return(
        <div className="Question">
            <InputField name={"Question: "} class={"InputQuestion"} onChange={props.onChangeQuestion}/>
            <InputField name={"Answer: "} class={"InputQuestion"} onChange={props.onChangeAnswer}/>
            <p></p>
        </div>
    )
}

export {InputField, ButtonInput, NotEntry, ButtonSend, QuestCard}
