import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";

class FilePage extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            localFicheiro: "",
            meuComent: "",
            comentarios: []
        }
    }

    componentDidMount = () => {
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }

        Axios.get("https://cyberpheonixback.eu-gb.mybluemix.net/ficheiro/" + this.props.match.params.id, config)
            .then(res => {
                const data = res.data;
                this.setState({ nome: data.nome, descricao: data.descricao, localFicheiro: data.localFicheiro });
            })
            .catch(err => { console.log(err.message) })

        Axios.get("https://cyberpheonixback.eu-gb.mybluemix.net/feedback/" + this.props.match.params.id, config)
            .then(res => {
                const data = res.data;
                data.reverse();
                this.setState({ comentarios: data });
            })
            .catch(err => { console.log(err.message) })
    }

    actComentar = (event) => {
        this.setState({ meuComent: event.target.value });
    }

    submit = (event) => {
        event.preventDefault();
        if (this.state.meuComent !== "") {
            const config = {
                headers: {
                    'Authorization': this.context.user.data.token,
                }
            }
            const com = {
                idUser: this.context.user.data._id,
                ficheiro: this.props.match.params.id,
                comentario: this.state.meuComent
            }
            Axios.post("https://cyberpheonixback.eu-gb.mybluemix.net/feedback", com, config)
                .then(res => { window.location.assign("/Ficheiro/" + this.props.match.params.id); })
                .catch(err => { console.log(err.message) })
        }
    }

    download = () => {
        window.open("https://cyberpheonixback.eu-gb.mybluemix.net/upDown/download/" + this.state.localFicheiro);
    }

    verImagem = () => {
        window.open("https://cyberpheonixback.eu-gb.mybluemix.net/imagem/" + this.state.localFicheiro);
    }

    render() {
        const { nome, descricao, comentarios } = this.state;
        return (
            <div class="container">
                <br />
                <h1>{nome}</h1>
                <br />
                <br />
                <p>{descricao}</p>
                <br /><br /><br />
                <button type="button" class="btn btn-outline-primary btn-lg btn-block" onClick={this.download}>Download</button>
                <br />
                <button type="button" class="btn btn-outline-success btn-sm" onClick={this.verImagem}>Sentir de perto</button>
                <br /><br /><br />
                <form onSubmit={this.submit}>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Comentarios aqui" aria-label="Comentarios aqui" aria-describedby="button-addon2" onChange={this.actComentar} />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Comentar</button>
                        </div>
                    </div>
                </form>
                <br /><br />
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Comentario</th>
                            <th scope="col">Quem Comentou</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comentarios.map(coment => {
                                return (
                                    <tr>
                                        <td>{coment.comentario}</td>
                                        <td>{coment.username}</td>
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