import React, { Component } from 'react';
import reactLogo from './reactLogo.svg';
import electronLogo from './electronLogo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component<Props, State> {

  state = {
    count: 0
  }

  componentDidMount = () => {
    ipcRenderer.on('increment', () => {
      this.increment()
    })

    ipcRenderer.on('decrement', () => {
      this.decrement()
    })
  }

  increment = () => {
    // declarative way - do not alter the DOM directly
    this.setState({ count: this.state.count + 1 })
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ reactLogo } className="App-logo" alt='react'/>
          <img src={ electronLogo } className="App-logo" alt='electron'/>
          <h1 className="App-title">Welcome to React & Electron</h1>
        </header>
        <h2> Value: { this.state.count } </h2>
        <div>
          <button onClick={ this.increment }> Increment </button>
          <button onClick={ this.decrement }> Decrement </button>
        </div>
      </div>
    );
  }
}

export default App;

