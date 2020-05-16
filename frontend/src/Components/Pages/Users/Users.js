import React, { Component } from "react"
//import Axios from "axios";
import AuthContext from "../../Configs/authContext";


class Users extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            cat: false,
            idUser: null,
            users: []
        }
    }


    render() {
        return (
            <div class="container">
                <br /><br />
                <h1>Users</h1>
                <br /><br />
            </div>
        );
    }

}

export default Users;