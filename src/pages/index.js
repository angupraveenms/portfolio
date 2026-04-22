import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Removed 'Projects' from the import list below
import { Layout, Hero, About, Jobs, Featured, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      {/* The Projects section has been removed to focus on your Featured Work */}
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
