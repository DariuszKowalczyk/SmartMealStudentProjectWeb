import React, { useState } from 'react';
import { Button, Form } from 'react-bulma-components/full';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginSelectors from '../../store/modules/login/selectors';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginBody = props => {
  if (props.activeScreen === 'login') {
    return <LoginForm />;
  }
  if (props.activeScreen === 'register') {
    return <RegisterForm />;
  }
};

const mapStateToProps = state => ({
  activeScreen: loginSelectors.getActiveScreen(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBody);
