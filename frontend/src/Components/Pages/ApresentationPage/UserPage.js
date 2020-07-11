import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";

class FilePage extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            descricao: "",
            sub: "ola",
            fich: []
        }
    }

    componentDidMount = () => {
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.get("http://localhost:5000/users/" + this.props.match.params.id, config)
            .then(res => {
                const data = res.data;
                this.setState({ username: data.username, descricao: data.descricao })
            })
            .catch(err => { alert("olha, ouve um erro") });

        Axios.get("http://localhost:5000/ficheiro/fichUser/" + this.props.match.params.id, config)
            .then(res => {
                const data = res.data;
                data.reverse();
                this.setState({ fich: data });
            })
            .catch(err => { alert("olha, ouve um erro") });

        const body = {
            quemSubcreveu: this.context.user.data._id,
            quemFoiSubscrito: this.props.match.params.id,
        }
        Axios.post("http://localhost:5000/subscription/subPart/", body, config)
            .then(res => {
                const data = res.data;
                this.setState({ sub: data });
            })
            .catch(err => { alert("olha, ouve um erro") });
    }

    subscrever = () => {
        const body = {
            quemSubcreveu: this.context.user.data._id,
            quemFoiSubscrito: this.props.match.params.id
        }
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.post("http://localhost:5000/subscription/add", body, config)
            .then(res => {
                const data = res.data;
                if (data === "unsuccess") alert("Este utilizador já tinha sido subscrito");
            })
            .catch(err => { alert("Aconteceu um erro") });
        window.location.assign("/Users/" + this.props.match.params.id);
    }

    desSubscrever = () => {
        const body = {
            quemSubcreveu: this.context.user.data._id,
            quemFoiSubscrito: this.props.match.params.id
        }
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.post("http://localhost:5000/subscription/delete", body, config)
            .then(res => {
                const data = res.data;
                if (data === "unsuccess") alert("Esta subscrição já tinha sido removida");
            })
            .catch(err => { alert("Aconteceu um erro") });
        window.location.assign("/Users/" + this.props.match.params.id);
    }

    change = (id) => {
        window.location.assign("/Ficheiro/" + id);
    }


    render() {
        const { username, descricao, sub, fich } = this.state;
        return (
            <div class="container">
                <br />
                <h1>{username}</h1>
                <br /><br />
                <p>{descricao}</p>
                <br /><br /><br />
                {!sub ? <button type="button" class="btn btn-outline-info btn-lg btn-block" onClick={this.subscrever}>Subscrever</button> : <button type="button" class="btn btn-outline-danger btn-lg btn-block" onClick={this.desSubscrever}>Apagar Subscrição</button>}
                <br /><br /><br />
                <h3>Ficheiros Carregados</h3>
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
                                        <td><button type="button" class="btn btn-outline-dark" onClick={() => this.change(ficheiro.idFicheiro)} >Ver</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default FilePage;