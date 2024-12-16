// components/Layout.js
import React from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

const Layout = ({ children, title = 'Letter Lobby' }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Container fluid className="p-3">
      {children}
    </Container>
  </>
);

export default Layout;
