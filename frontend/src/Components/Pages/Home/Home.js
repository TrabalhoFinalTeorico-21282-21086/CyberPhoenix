import React, { Component } from "react";
import BackgroundSlider from 'react-background-slider';
import d from "./Images/d.jpg";
import i from "./Images/i.jpg";
import p from "./Images/p.jpg";


class Home extends Component {

    entrar = () => {
        window.location.assign("/CategoriaGeral");
    }

    render() {
        const style = {
            textAlign: "center",
            marginTop: "30%"
        }
        return (
            <div class="container" style={style}>
                <h1 class="display-3" >CyberPhoenix</h1>
                <br />
                <button type="button" class="btn btn-outline-dark btn-lg btn-block" onClick={this.entrar}>Entrar</button>
                <BackgroundSlider
                    images={[d, i, p]}
                    duration={7} transition={2} />
            </div >
        );
    }
}

export default Home;