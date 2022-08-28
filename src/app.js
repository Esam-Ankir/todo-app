import React, { Component } from 'react'

import ToDo from './components/todo/todo';
import Navbar from './components/navbar/navbar';
import SettingsContextProvider from './context/Settings';


export default class App extends Component {
  render() {
    return (
      <div>
        <SettingsContextProvider>
          <Navbar />
          <ToDo />
        </SettingsContextProvider>
      </div>
    )
  }
}