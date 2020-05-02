import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "./../../Configs/authContext"

class Login extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "username",
            pass: "password"
        };
    }

    componentDidMount = () => {
        this.setState({
            username: "username",
            pass: "password"
        });
    }

    actUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    actPass = (event) => {
        this.setState({
            pass: event.target.value
        });
    }

    submit = (event) => {
        Axios.post("http://localhost:5000/users/autenticar", this.state)
            .then(res => {
                const data = res.data;
                data.message === "success" ? this.context.login({ username: this.state.username, data }) : alert("Username ou Password não verificam");
            })
            .catch(err => { console.log(err); })
    }

    render() {
        return (
            <div class="container">
                <br />
                <h1>Login</h1>
                <br />
                <form onSubmit={this.submit}>
                    <div class="form-group">
                        <label >Username</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" placeholder={this.state.username} onChange={this.actUsername} ></input>
                    </div>
                    <div class="form-group">
                        <label >Password</label>
                        <input type="password" class="form-control" id="formGroupExampleInput2" placeholder={this.state.pass} onChange={this.actPass} ></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;

//https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0