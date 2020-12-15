import React from "react";
import SignIn from "./Login";
import Registration from "./Registration";
import {useRoutes} from 'hookrouter';
import Home from "./MainPage";
import Menu from "./Menu";
import Footer from "./Footer";
import {CreateTest } from "./CreateTest";
import {Questions} from "./StartTest";
import {Start} from "./Test";
import './App.css';
import NotFound from "./NotFound";

const routes = {
    '/': () => <Home />,
    '/login': () => <SignIn />,
    '/register': () => <Registration />,
    '/test': () => <Questions />,
    '/test/:id': () => <Start />,
    '/create' : () => <CreateTest />
};

const App = ()=>{
    const routeResult = useRoutes(routes) || <NotFound/>;
    return (
        <div className={"App"}>
            <Menu />
            {routeResult}
        </div>
    )
}

export default App;