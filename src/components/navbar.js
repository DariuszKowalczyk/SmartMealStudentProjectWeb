import React, { useState } from 'react';
import { Navbar, Button } from 'rbx';

export default function NavbarLayout() {
  return (
    <Navbar transparent color="primary">
      <Navbar.Brand>
        <Navbar.Item>SMART MEAL</Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Segment align="end">
          <Navbar.Item>
            <Button.Group>
              <Button color="primary">
                <strong>Sign up</strong>
              </Button>
              <Button color="light">Log in</Button>
            </Button.Group>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
  );
}
