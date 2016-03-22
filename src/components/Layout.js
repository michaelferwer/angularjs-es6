import React from 'react';
import {Navbar, Nav, NavBrand, NavItem, CollapsibleNav, Image} from 'react-bootstrap';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Layout">
        <Navbar className="staticTop" toggleNavKey={0}>
          <NavBrand><a href="#">Library</a></NavBrand>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <NavItem eventKey={1} href="#/catalog">
                <Image className="small-icon" src="img/book.png"/>
                Catalog
              </NavItem>
            </Nav>
            <Nav navbar right>
              <NavItem eventKey={1} href="#/cart">
                <Image className="small-icon" src="img/cart.png"/>
                Cart
              </NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
