import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
// See lesson 183 if any issue with semantic-ui-css import 
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
