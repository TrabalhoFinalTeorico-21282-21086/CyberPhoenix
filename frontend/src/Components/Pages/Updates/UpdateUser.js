import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "./../../Configs/authContext"

class UpdateUser extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "username",
            email: "e-mail",
            pass: "password",
            descricao: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            username: "username",
            email: "e-mail",
            pass: "password",
            descricao: ""
        });
    }

    actUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    actEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    actPass = (event) => {
        this.setState({
            pass: event.target.value
        });
    }

    actDescricao = (event) => {
        this.setState({
            descricao: event.target.value
        });
    }

    submit = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        const body = {
            username: this.state.username,
            pass: this.state.pass,
            descricao: this.state.descricao,
            email: this.state.email,
            idUser: this.context.user.data._id
        }
        Axios.post("http://localhost:5000/users/alterar", body, config)
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data !== "success") alert("Olha, houve um erro");
            })
            .catch(err => { alert("Username " + this.state.username + " já em uso"); })
            .finally(fin => { window.location.assign("/MeMySelfAndI"); })
    }

    render() {
        return (
            <div class="container">
                <br />
                <h1>Alterar Perfil</h1>
                <br />
                <form onSubmit={this.submit}>
                    <div class="form-group">
                        <label >Username</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" placeholder={this.state.username} onChange={this.actUsername}></input>
                    </div>
                    <div class="form-group">
                        <label >Email</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder={this.state.email} onChange={this.actEmail}></input>
                    </div>
                    <div class="form-group">
                        <label >Password</label>
                        <input type="password" class="form-control" id="formGroupExampleInput3" placeholder={this.state.pass} onChange={this.actPass}></input>
                    </div>
                    <div class="form-group">
                        <label >Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.actDescricao}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Alterar</button>
                </form>
            </div>
        );
    }
}

export default UpdateUser;