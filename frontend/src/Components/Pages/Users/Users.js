import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";


class Users extends Component {
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
        Axios.get("http://localhost:5000/users", config)
            .then(res => {
                const data = res.data;
                this.setState({ cat: true, users: data })
            })
            .catch(err => { alert(err.message); })
    }

    change = (id) => {
        window.location.assign("/Users/" + id);
    }

    login = () => {
        alert("Só é possivel aceder aos documentos com uma conta registada");
        window.location.assign("/login");
        console.log();
    }


    render() {
        const { users } = this.state;
        return (
            <div class="container">
                <br />
                <h1>Utilizadores</h1>
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
                                        <button type="button" class="btn btn-outline-dark" onClick={() => this.change(username.idUser)} >Ver</button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        );
    }

}

export default Users;