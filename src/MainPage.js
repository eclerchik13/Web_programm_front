import React from "react";
import {ButtonSend} from "./components/input.js";

function Home(){
    return(
        <div className="Home">
            <div className="head">Система онлайн тестирования</div>
            <div className="InfoAboutSubject">
                <p>Наша система тестирования поможет Вам проверить свои знания
                Здесь вы можете пройти тесты по физике, математике, программированию.
            Также Вы можете добавить свои тесты.</p>
            </div>
            <ButtonSend link={"create"} function={"Создать тест"}/>
            <ButtonSend link={"tests"} function={"Пройти тест"}/>
        </div>
    )
}

export default Home;