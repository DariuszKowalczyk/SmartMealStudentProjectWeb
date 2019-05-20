import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Button, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import './navbar.css';

/* <Navbar style={{ backgroundColor: '#00d1b2' }}> */
const cookies = new Cookies();

const NavbarLayout = props => {
  const logout = () => {
    cookies.remove('jwt');
    props.history.push('/login');
  };
  return (
    <Navbar expand="lg" bg="primary" variant="light">
      <Navbar.Brand href="#home">Smart Meal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="navbar-light navbar-nav nav-link" to="/">Kalendarz</Link>
          <Link className="navbar-light navbar-nav nav-link" to="/Products">Produkty</Link>
          <Link className="navbar-light navbar-nav nav-link" to="/Recipes">Przepisy</Link>
        </Nav>
        <Nav className="">
          {cookies.get('jwt') ? <Button onClick={() => logout()}>WYLOGUJ</Button> : <Button onClick={()=>props.history.push('/login')}>Zaloguj</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default withRouter(NavbarLayout)