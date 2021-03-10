import axios from "axios";
import React, { Component } from "react";

export default class Kalkulator extends Component {
    state = {
        a: 0,
        b: 0,
        tipe: '',
        ans: 0,
        loading: false
    };


    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: parseInt(event.target.value)
        });
    };

    onClickButton = (tipe) => {
        this.setState({
            loading: true
        });
        const hitung = {
            a: this.state.a,
            b: this.state.b,
            ans: this.state.ans,
            tipe: tipe
        };

        axios.post('https://arinugraha.herokuapp.com/kabataku', hitung)
            .then(response => {
                this.setState({
                    ans: response.data['ans'],
                    loading: false
                })
            })
    }

    render() {
        let loading = null;
        if (this.state.loading) {
            loading = <p>Loading</p>;
        };

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
                <br />
                {loading}
            </div>
        );
    }
}
