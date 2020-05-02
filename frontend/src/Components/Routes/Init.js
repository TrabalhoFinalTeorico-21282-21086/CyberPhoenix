import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registar from "../Pages/Register/Register";
import AuthContext from "./../Configs/authContext"
import Dropdown from "react-bootstrap/Dropdown";


class Inicio extends React.Component {
    static contextType = AuthContext;
    render() {
        const { user, logout } = this.context;
        return (
            <Router>
                <nav className="navbar sticky-top navbar-light bg-light">
                    <Link className="navbar-brand" to="/">CyberPhoenix</Link>
                    <Dropdown>
                        <Dropdown.Toggle size="lg" variant="Secondary" id="dropdown-basic-Secondary"> Categorias </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item ><Link className="navbar-brand " to="/porFazer1">Jogos</Link></Dropdown.Item>
                            <Dropdown.Item ><Link className="navbar-brand " to="/porFazer1">Documentos</Link></Dropdown.Item>
                            <Dropdown.Item ><Link className="navbar-brand " to="/porFazer1">Imagens</Link></Dropdown.Item>
                            <Dropdown.Item ><Link className="navbar-brand " to="/porFazer1">Todas</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {user && <Link className="navbar-brand " to="/registo">Carregar Ficheiro</Link>}
                    {!user && <Link className="navbar-brand " to="/registo">Registar</Link>}
                    {!user ? <Link className="navbar-brand " to="/login">Login</Link> : <Link className="navbar-brand " to="/login" onClick={() => logout()}>Logout</Link>}
                </nav>
                {console.log(this.context.user)}
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/porFazer1"></Route>
                    <Route path="/registo"><Registar /></Route>
                    <Route path="/login"><Login /></Route>
                </Switch>
            </Router>
        );
    }
}

export default Inicio;