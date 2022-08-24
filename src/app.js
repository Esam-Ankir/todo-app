import React from 'react';
import Header from './components/header.js';

import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Header/>
      <ToDo />
      </>
    );
  }
}
