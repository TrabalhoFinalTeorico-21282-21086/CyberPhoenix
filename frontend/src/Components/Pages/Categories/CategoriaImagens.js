import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";

class Categoria extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            fich: []
        }
    }

    componentDidMount = () => {
        Axios.post("https://cyberpheonixback.eu-gb.mybluemix.net/ficheiro", { tipo: "Imagem" })
            .then(res => {
                const data = res.data;
                data.reverse();
                this.setState({ cat: true, fich: data })
            })
            .catch(err => { alert(err.message); })
    }

    change = (id) => {
        window.location.assign("/Ficheiro/" + id);
    }

    login = () => {
        alert("Só é possivel aceder aos documentos com uma conta registada");
        window.location.assign("/Login");
    }

    render() {
        const { user } = this.context;
        const { fich } = this.state;
        return (
            <div class="container">
                <br />
                <h1 class="display-4">Imagens</h1>
                <br />
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Visualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fich.map((ficheiro) => {
                                return (
                                    <tr>
                                        <td>{ficheiro.nome}</td>
                                        <td>{ficheiro.descricao.slice(0, 250)}</td>
                                        <td>{ficheiro.tipoDeFicheiro}</td>
                                        <td>{user ? <button type="button" class="btn btn-outline-dark" onClick={() => this.change(ficheiro.idFicheiro)} >Ver</button> : <button type="button" class="btn btn-outline-dark disabled" onClick={this.login}>Ver</button>}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >);
    }
}

export default Categoria;
