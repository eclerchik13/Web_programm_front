import React from "react";
import SignIn from "./Login";
import Registration from "./Registration";
import {useRoutes} from 'hookrouter';
import Home from "./MainPage";
import Menu from "./Menu";
import Footer from "./Footer";
import {CreateTest } from "./CreateTest";
import {GetQuestions} from "./StartTest";
import {Start} from "./Test";
import './App.css';
import NotFound from "./NotFound";
import Account from "./Account";

const routes = {
    '/': () => <Home />,
    '/login': () => <SignIn />,
    '/register': () => <Registration />,
    '/tests': () => <GetQuestions />,
    '/test/:id': ({id}) => <Start id={id}/>,
    '/create' : () => <CreateTest />,
    '/account' : () => <Account />
};

const App = () =>{
    const routeResult = useRoutes(routes) || <NotFound />;
    return (
        <div className={"App"}>
            <Menu />
            {routeResult}
        </div>
    )
}

export default App;