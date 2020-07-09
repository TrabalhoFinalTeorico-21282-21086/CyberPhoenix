import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../../Configs/authContext";


class mostrarQuemFoiSubscrito extends Component {
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
        Axios.get("http://localhost:5000/subscription//mostrarQuemFoiSubscrito/" + this.props.match.params.id, config)
            .then(res => {
                const data = res.data;
                this.setState({ cat: true, users: data })
            })
            .catch(err => { alert(err.message); })
    }

    change = (id) => {
        window.location.assign("/Users/" + id);
    }

    desSubscrever = (id) => {
        const body = {
            quemSubcreveu: this.context.user.data._id,
            quemFoiSubscrito: id
        }
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.post("http://localhost:5000/subscription/delete", body, config)
            .then(res => {
                const data = res.data;
                if (data === "unsuccess") alert("Esta subscrição já tinha sido removida");
            })
            .catch(err => { alert("Aconteceu um erro") });
        window.location.assign("/MostrarQuemFoiSubscrito/" + this.props.match.params.id);
    }

    render() {
        const { users } = this.state;
        return (
            <div class="container">
                <br />
                <h1>Quem Subscrevi</h1>
                <br />
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Visualização</th>
                            <th scope="col">Apagar</th>
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
                                        <td><button type="button" class="btn btn-danger" onClick={() => this.desSubscrever(username.idUser)} >Apagar Subscrição</button></td>
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

export default mostrarQuemFoiSubscrito;