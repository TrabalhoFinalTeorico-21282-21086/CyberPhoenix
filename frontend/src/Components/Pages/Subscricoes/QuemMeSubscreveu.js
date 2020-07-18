import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";


class mostrarQuemSubscreveu extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.get("https://cyberpheonixback.eu-gb.mybluemix.net/subscription/mostrarQuemSubscreveu/" + this.props.match.params.id, config)
            .then(res => {
                const data = res.data;
                this.setState({ cat: true, users: data })
            })
            .catch(err => { alert(err.message); })
    }

    change = (id) => {
        window.location.assign("/Users/" + id);
    }

    render() {
        const { users } = this.state;
        return (
            <div class="container">
                <br />
                <h1>Quem me subscreveu</h1>
                <br />
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Visualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((username) => {
                                return (
                                    <tr>
                                        <td>{username.username}</td>
                                        <td>{username.descricao.slice(0, 250)}</td>
                                        <td><button type="button" class="btn btn-outline-dark" onClick={() => this.change(username.idUser)} >Ver Utilizador</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div >
        );
    }

}

export default mostrarQuemSubscreveu;