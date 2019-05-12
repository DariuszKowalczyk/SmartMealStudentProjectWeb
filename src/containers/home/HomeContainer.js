import React from 'react';
import { Button, Form } from 'react-bulma-components/full';
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
    <div>
      Home hello <Button onClick={() => logout()}>WYLOGUJ</Button>
      <Calendar />
    </div>
  );
};

export default withRouter(Home);
