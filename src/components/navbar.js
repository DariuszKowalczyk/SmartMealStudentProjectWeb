import React, { useState } from 'react';
import { Navbar } from 'react-bulma-components/full';
import styled from 'styled-components';

const NavigationBar = styled(Navbar)``;

export default function NavbarLayout() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <NavigationBar color="primary" active={open}>
      <Navbar.Brand>
        <Navbar.Item renderAs="p">ContestApp</Navbar.Item>
        <Navbar.Burger onClick={() => toggleOpen()} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Second</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Navbar.Item href="#">At the end</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </NavigationBar>
  );
}
