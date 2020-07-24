import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";


class Eu extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            descricao: "",
            fich: []
        }
    }

    componentDidMount = () => {
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.get("http://localhost:5000/users/" + this.context.user.data._id, config)
            .then(res => {
                const data = res.data[0];
                this.setState({ username: data.username, descricao: data.descricao })
            })
            .catch(err => { alert("olha, ouve um erro") });

        Axios.get("http://localhost:5000/ficheiro/fichUser/" + this.context.user.data._id, config)
            .then(res => {
                const data = res.data;
                data.reverse();
                this.setState({ fich: data });
            })
    }

    change = (id) => {
        window.location.assign("/Ficheiro/" + id);
    }

    quemSubscrevi = () => {
        window.location.assign("/MostrarQuemFoiSubscrito/" + this.context.user.data._id);
    }

    quemMeSubscreveu = () => {
        window.location.assign("/MostrarQuemSubscreveu/" + this.context.user.data._id);
    }

    apagarFicheiro = (fich) => {
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.post("http://localhost:5000/updown/delete", fich, config)
            .then(res => {
                const data = res.data;
                if (data !== "success") alert("Olha, deu um erro");
            })
            .catch(err => { alert("Olha, deu um erro"); })
            .finally(fin => { window.location.assign("/MeMySelfAndI"); });
    }

    carregarFicheiro = () => {
        window.location.assign("/Upload");
    }

    updateFicheiro = (id) => {
        window.location.assign("/UpdateFile/" + id);
    }

    updateUser = () => {
        window.location.assign("/UpdateUser");
    }

    goodBye = () => {
        window.location.assign("/DeleteUser");
    }

    render() {
        const { username, descricao, fich } = this.state;
        return (
            <div class="container">
                <br />
                <h2 class="display-4">Minha Página</h2>
                <br />
                <h1 class="display-3">{username}</h1>
                <br />
                <p>{descricao}</p>
                <br /><br /><br />
                <button type="button" class="btn btn-success btn-lg btn-block" onClick={this.carregarFicheiro}>Carregar Ficheiro</button>
                <br /><br />
                <button type="button" class="btn btn-info btn-lg btn-block" onClick={this.quemSubscrevi} >Quem Subscrevi</button>
                <br />
                <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.quemMeSubscreveu} >Quem Me Subscreveu</button>
                <br /><br />
                <button type="button" class="btn btn-warning" onClick={this.updateUser}>Alterar Perfil</button>
                &emsp;
                <button type="button" class="btn btn-danger" onClick={this.goodBye}>Apagar Perfil</button>
                <br /><br />
                <h3>Meus Ficheiros Carregados</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Visualizar?</th>
                            <th scope="col">Modificar?</th>
                            <th scope="col">Apagar?</th>
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
                                        <td><button type="button" class="btn btn-outline-dark" onClick={() => this.change(ficheiro.idFicheiro)} >Visualizar</button></td>
                                        <td><button type="button" class="btn btn-outline-primary" onClick={() => this.updateFicheiro(ficheiro.idFicheiro)} >Modificar</button></td>
                                        <td><button type="button" class="btn btn-outline-danger" onClick={() => this.apagarFicheiro({ idFicheiro: ficheiro.idFicheiro, localFicheiro: ficheiro.localFicheiro })} >Apagar</button></td>
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

export default Eu;