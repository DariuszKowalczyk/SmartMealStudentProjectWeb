import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Calendar from '../../components/calendar/Calendar';


const Home = props => {
  
  return (
    <Container fluid>
      
      <Calendar />
    </Container>
  );
};

export default Home;
