import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registar from "../Pages/Register/Register";
import Upload from "../Pages/Upload/Upload";
import Categoria from "../Pages/Categories/Categoria";
import AuthContext from "./../Configs/authContext"
//import Dropdown from "react-bootstrap/Dropdown";


class Inicio extends React.Component {
    static contextType = AuthContext;
    render() {
        const { user, logout } = this.context;
        return (
            <Router>
                <nav className="navbar sticky-top navbar-light bg-light">
                    <Link className="navbar-brand" to="/">CyberPhoenix</Link>
                    <Link className="navbar-brand " to="/categoria">Categorias</Link>
                    {user && <Link className="navbar-brand " to="/upload">Carregar Ficheiro</Link>}
                    {!user && <Link className="navbar-brand " to="/registo">Registar</Link>}
                    {!user ? <Link className="navbar-brand " to="/login">Login</Link> : <Link className="navbar-brand " to="/login" onClick={() => logout()}>Logout</Link>}
                </nav>
                {console.log(this.context.user)}
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/categoria"><Categoria /></Route>
                    <Route path="/registo"><Registar /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/upload"><Upload /></Route>
                </Switch>
            </Router>
        );
    }
}

export default Inicio;

/*                    <Dropdown>
                        <Dropdown.Toggle size="lg" variant="Secondary" id="dropdown-basic-Secondary"> Categorias </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item ><Link className="navbar-brand " to="/categoria">Todas</Link></Dropdown.Item>
                            <Dropdown.Item ><Link className="navbar-brand " to="/categoria">Jogos</Link></Dropdown.Item>
                            <Dropdown.Item ><Link className="navbar-brand " to="/categoria">Todas</Link></Dropdown.Item>
                            <Dropdown.Item ><Link className="navbar-brand " to="/categoria">Jogos</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
*/