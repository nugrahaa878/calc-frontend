import axios from "axios";
import React, { Component } from "react";

export default class Kalkulator extends Component {
    state = {
        a: 0,
        b: 0,
        tipe: '',
        ans: 0,
    };

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: parseInt(event.target.value)
        });
    };

    onClickButton = (tipe) => {
        const hitung = {
            ...this.state,
            tipe: tipe
        }
        axios.post('http://127.0.0.1:8000/kabataku/', hitung)
            .then(response => {
                this.setState({
                    ans: response.data['ans']
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.ans}
                <br/>
                <input type="number" name="a" onChange={this.handleChange}/>
                <input type="number" name="b" onChange={this.handleChange}/>
                <br/>
                <button onClick={() => this.onClickButton('+')}>+</button>
                <button onClick={() => this.onClickButton('-')}>-</button>
                <button onClick={() => this.onClickButton('*')}>*</button>
                <button onClick={() => this.onClickButton('/')}>/</button>
            </div>
        );
    }
}
