import React, { Component } from "react";
//import Axios from "axios";
import AuthContext from "../../Configs/authContext"

class Categoria extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="container">
                <br />
                <h1>Categoria de pagina</h1>
            </div>);
    }
}

export default Categoria;