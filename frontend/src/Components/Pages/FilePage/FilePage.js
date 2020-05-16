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
            localFicheiro: ""
        }
    }

    componentDidMount = () => {
        if (this.context.user) {
            const config = {
                headers: {
                    'Authorization': this.context.user.data.token,
                }
            }
            Axios.get("http://localhost:5000/ficheiro/" + this.props.idFicheiro, config)
                .then(res => {
                    const data = res.data;
                    this.setState({ nome: data.nome, descricao: data.descricao, localFicheiro: data.localFicheiro })
                })
                .catch(err => { console.log(err.message) })
        }
    }

    download = () => {
        window.open("http://localhost:5000/upDown/download/" + this.state.localFicheiro);
    }

    voltar = () => {
        window.location.assign("/" + this.props.pagina);
    }

    render() {
        const { nome, descricao } = this.state;
        return (
            <div class="container">
                <br />
                <h1>{nome}</h1>
                <br />
                <br />
                <p>{descricao}</p>
                <br /><br /><br />
                <button type="button" class="btn btn-secondary btn-lg" onClick={this.download}>Download</button>
                <br /><br /><br />
                <button type="button" class="btn btn-warning" onClick={this.voltar}>Voltar</button>
            </div>
        );
    }

}

export default FilePage;