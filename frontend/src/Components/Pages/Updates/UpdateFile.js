import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "./../../Configs/authContext"

class UpdateFile extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            nome: "Nome do ficheiro",
            descricao: ""
        };
    }

    componentDidMount = () => {
        this.setState({
            nome: "Nome do ficheiro",
            descricao: "",
        });
    }

    actNome = (event) => {
        event.preventDefault();
        this.setState({
            nome: event.target.value
        });
    }

    actDescricao = (event) => {
        event.preventDefault();
        this.setState({
            descricao: event.target.value
        });
        console.log(this.state);
    }

    submit = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        const body = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            idFicheiro: this.props.match.params.id
        }
        Axios.post("http://localhost:5000/updown/update", body, config)
            .then(res => {
                const data = res.data;
                if (data === "success") alert("Ficheiro Modificado com sucesso");
            })
            .catch(err => { alert("Olha, houve um erro"); })

        window.location.assign("/MeMySelfAndI");
    }

    render() {
        return (
            <div class="container">
                <br />
                <h1>Alterar Ficheiro</h1>
                <br />
                <form onSubmit={this.submit}>
                    <div class="form-group">
                        <label >Nome</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" placeholder={this.state.nome} onChange={this.actNome} ></input>
                    </div>
                    <div class="form-group">
                        <label >Descrição</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.actDescricao}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Alterar</button>
                </form>
            </div>
        );
    }
}

export default UpdateFile;