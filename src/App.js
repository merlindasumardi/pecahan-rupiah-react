import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moneyPattern: /^(Rp)?\s?(\d+(\.\d{3})*|(\d+))(,\d{0,2})?$/,
      nominal: 0,
      pecahan: [],
      invalidInput: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      let uang = event.target.value;
      if (uang.match(this.state.moneyPattern)) {
        console.log('match');
        const f = uang.split(',')[0];
        uang =  +f.replace(/\D+/g, '');

        this.setState({
          nominal: uang,
          invalidInput: false,
          pecahan: [],
        });
      } else {
        this.setState({
          invalidInput: true,
          pecahan: [],
        });
      }
  }

  handleSubmit(event) {
    event.preventDefault();
    let nominal = this.state.nominal;
    let map = {
      100000: 0,
      50000: 0,
      20000: 0,
      10000: 0,
      5000: 0,
      2000: 0,
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0
    };
    const arr = Object.keys(map);
    let pecahan = [];

    if (nominal % 50 !== 0 && nominal < 50) {
      alert('Tidak dapat dihitung');
    }

    while (nominal >= 50) {
      for (let i = arr.length - 1 ; i >= 0 ; i--) {
        if (nominal >= arr[i]) {
          map[arr[i]] += 1;
          nominal -= +arr[i];
          break;
        }
      }
    }

    for (let i = arr.length - 1 ; i >= 0 ; i-- ) {
      if (map[arr[i]] > 0) {
        console.log(`${map[arr[i]]} lembar uang ${arr[i]}`);

        const answer = map[arr[i]] + ' lembar uang Rp ' + arr[i];

         pecahan.push(answer);
         map[arr[i]] = 0;

      }
    }

    this.setState({
      pecahan,
    });
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <>
        <h2 className="title">Aplikasi Pecahan Rupiah</h2>
        <form onSubmit={this.handleSubmit}>
        <label className="subtitle">
          Masukkan nominal untuk mendapatkan pecahan. contoh input: Rp 17.500, Rp17500, 17500, 17500,00, 17.500
        </label>
        <input type="text" name="nominal" value={this.state.value} onChange={(event) => this.handleChange(event)} onKeyPress={this.handleEnter} className="input-field" required />
        {this.state.invalidInput && <span className="error">Format input salah, input tidak boleh mengandung spasi dan koma sebagai pemisah ribuan, Rp harus di depan, dan Rp harus di sertai nominal</span>}
        <input type="submit" value="submit" className="submit-btn" disabled={this.state.invalidInput}/>
        </form>
        <div className="result-box">
        {_.map(this.state.pecahan, (data, i) => (
          <p>{data}</p>
        ))}
        </div>
      </>
    );
  }
}

export default App;
