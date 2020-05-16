import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registar from "../Pages/Register/Register";
import Upload from "../Pages/Upload/Upload";
import CategoriaGeral from "../Pages/Categories/CategoriaGeral";
import CategoriaDocumentos from "../Pages/Categories/CategoriaDocumentos";
import CategoriaImagens from "../Pages/Categories/CategoriaImagens";
import CategoriaPastas from "../Pages/Categories/CategoriaPastas";
import CategoriaOutros from "../Pages/Categories/CategoriaOutros";
import Users from "../Pages/Users/Users";
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
                        <Dropdown.Toggle variant="secondary" id="dropdown-variants-secondary">Categorias</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/CategoriaDocumentos">Documentos</Dropdown.Item>
                            <Dropdown.Item href="/CategoriaImagens">Imagens</Dropdown.Item>
                            <Dropdown.Item href="/CategoriaPastas">Pastas Comprimidas</Dropdown.Item>
                            <Dropdown.Item href="/CategoriaOutros">Outros</Dropdown.Item>
                            <Dropdown.Item href="/CategoriaGeral">Todos</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {user && <Link className="navbar-brand " to="/utilizadores">Utilizadores</Link>}
                    {user && <Link className="navbar-brand " to="/upload">Carregar Ficheiro</Link>}
                    {!user && <Link className="navbar-brand " to="/registo">Registar</Link>}
                    {!user ? <Link className="navbar-brand " to="/login">Login</Link> : <Link className="navbar-brand " to="/login" onClick={() => logout()}>Logout</Link>}
                </nav>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/CategoriaGeral"><CategoriaGeral /></Route>
                    <Route path="/CategoriaDocumentos"><CategoriaDocumentos /></Route>
                    <Route path="/CategoriaImagens"><CategoriaImagens /></Route>
                    <Route path="/CategoriaPastas"><CategoriaPastas /></Route>
                    <Route path="/CategoriaOutros"><CategoriaOutros /></Route>
                    <Route path="/registo"><Registar /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/upload"><Upload /></Route>
                    <Route path="/utilizadores"><Users /></Route>
                </Switch>
            </Router>
        );
    }
}

export default Inicio;