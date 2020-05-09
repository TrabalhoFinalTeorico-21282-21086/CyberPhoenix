import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "./../../Configs/authContext"

class Upload extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            nome: "Nome do ficheiro",
            descricao: "",
            file: null
        };
    }

    componentDidMount = () => {
        this.setState({
            nome: "Nome do ficheiro",
            descricao: "",
        });
    }

    actNome = (event) => {
        this.setState({
            nome: event.target.value
        });
    }

    actDescricao = (event) => {
        this.setState({
            descricao: event.target.value
        });
    }

    actFile = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    submit = (event) => {
        const formData = new FormData();
        formData.set('nome', this.state.nome);
        formData.set('descricao', this.state.descricao);
        formData.append('file', this.state.file);
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
                'content-type': 'multipart/form-data'
            }
        }
        Axios.post("http://localhost:5000/ficheiro/" + this.context.user.data._id, formData, config)
            .then(res => {
                const data = res.data;
                console.log(data);
            })
            .catch(err => { alert(err.message); })
    }

    render() {
        return (
            <div class="container">
                <br />
                <h1>Ficheiro a Carregar</h1>
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
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Ficheiro</label>
                        <input type="file" class="form-control-file" onChange={this.actFile} name="file" id="exampleFormControlFile1" />
                    </div>
                    <button type="submit" class="btn btn-primary">Carregar</button>
                </form>
            </div>
        );
    }
}

export default Upload;