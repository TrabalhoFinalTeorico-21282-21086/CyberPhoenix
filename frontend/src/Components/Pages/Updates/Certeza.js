import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "./../../Configs/authContext"


class Certeza extends Component {
    static contextType = AuthContext;

    apagarUtilizador = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Authorization': this.context.user.data.token,
            }
        }
        Axios.delete("https://cyberpheonixback.eu-gb.mybluemix.net/users/" + this.context.user.data._id, config)
            .then(res => {
                const data = res.data;
                if (data !== "goodBye") {
                    alert("Adeus");
                    window.location.assign("/");
                }
            })
            .catch(err => { alert("Olha, deu um erro"); })
            .finally(err => {
                this.context.logout();
                window.location.assign("/");
            })

    }

    render() {
        return (<div class="container">
            <br /><br />
            <h1 class="display-3">Ficamos tristes por o ver partir, tem a certeza ?  :(</h1>
            <br /><br /><br /><br /><br /><br />
            <button type="button" class="btn btn-danger btn-lg btn-block" onClick={this.apagarUtilizador}>Sim, eu quero partir</button>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h5>Todos os teus dados irão ser apagados, ficheiros, subscrições e comentários</h5>
        </div>
        );
    }
}

export default Certeza;