import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "./../../Configs/authContext"

class Register extends Component {
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
        Axios.post("https://cyberpheonixback.eu-gb.mybluemix.net/users/registar", this.state)
            .then(res => {
                const data = res.data;
                this.context.login({ username: this.state.username, data });
                window.location.assign("/");
            })
            .catch(err => { alert("Username " + this.state.username + " já em uso"); })
    }

    render() {
        return (
            <div class="container">
                <br />
                <h1 class="display-4" >Registar</h1>
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
                    <button type="submit" class="btn btn-primary">Registar</button>
                </form>
            </div>
        );
    }
}

export default Register;