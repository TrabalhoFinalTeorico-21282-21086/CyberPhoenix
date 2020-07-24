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
            tipoDeFicheiro: "Outro",
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
    }

    actTipo = (event) => {
        event.preventDefault();
        if (event.target.value === "Diga qual o tipo do seu ficheiro") this.setState({ tipoDeFicheiro: "Outro" });
        else this.setState({ tipoDeFicheiro: event.target.value });
    }

    actFile = (event) => {
        event.preventDefault();
        this.setState({
            file: event.target.files[0]
        });
    }


    submit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.set('nome', this.state.nome);
        formData.set('descricao', this.state.descricao);
        formData.set('tipo', this.state.tipoDeFicheiro);
        formData.append('file', this.state.file);
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
                'content-type': 'multipart/form-data'
            }
        }
        event.preventDefault();
        Axios.post("http://localhost:5000/updown/upload/" + this.context.user.data._id, formData, config)
            .then(res => { })
            .catch(err => { alert(err.message); })
            .finally(fin => { window.location.assign("/MeMySelfAndI"); })

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
                        <label >Tipo de ficheiro</label>
                        <select id="inputState" class="form-control" onChange={this.actTipo}>
                            <option selected>Diga qual o tipo do seu ficheiro</option>
                            <option>Documento</option>
                            <option>Imagem</option>
                            <option>Pasta Comprimida</option>
                            <option>Outro</option>
                        </select>
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