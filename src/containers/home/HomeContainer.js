import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Calendar from '../../components/calendar/Calendar';

const cookies = new Cookies();
const Home = props => {
  const logout = () => {
    cookies.remove('jwt');
    console.log(cookies.get('jwt'), 'cookie');
    console.log('props', props);
    props.history.push('/login');
  };
  return (
    <Container fluid>
      Home hello <Button onClick={() => logout()}>WYLOGUJ</Button>
      <Calendar />
    </Container>
  );
};

export default withRouter(Home);
