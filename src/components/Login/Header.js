import React from 'react';
import { Field } from 'rbx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginSelectors from '../../store/modules/login/selectors';
import { switchBetweenLoginRegister } from '../../store/modules/login/actions';
import HeaderButton from '../common/HeaderButton';

const Header = props => {
  const { switchBetweenLoginRegister, activeScreen } = props;
  return (
    <Field kind="addons">
      <HeaderButton value="Logowanie" onClick={() => switchBetweenLoginRegister('login')} isActive={activeScreen === 'login'} />
      <HeaderButton value="Rejestracja" onClick={() => switchBetweenLoginRegister('register')} isActive={activeScreen === 'register'} />
    </Field>
  );
};

const mapStateToProps = state => ({
  activeScreen: loginSelectors.getActiveScreen(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      switchBetweenLoginRegister,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
