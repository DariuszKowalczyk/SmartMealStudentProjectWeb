import React from 'react';
import { Notification } from 'react-bulma-components';
import styled from 'styled-components';

const CustomNotification = styled(Notification)`
  padding: 0.3rem;
  text-align: center;
`;

export const ErrorBox = ({ message }) => <CustomNotification color="danger">{message}</CustomNotification>;
export const SuccessBox = ({ message }) => <CustomNotification color="success">{message}</CustomNotification>;
