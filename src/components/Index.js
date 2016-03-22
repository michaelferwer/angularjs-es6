import React from 'react';
import { Link } from 'react-router'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Welcome to the new library market place.</h1>
        <ul>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>);
  }
}
