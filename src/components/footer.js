import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1.5;

  a {
    padding: 5px;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }
  }

  .github-stats {
    margin-top: 5px;
    opacity: 0.8;
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
      </ul>
    </StyledSocialLinks>

    <StyledCredit tabindex="-1">
      <div>
          Developed by
        <a href="https://github.com/angu-praveen" target="_blank" rel="noreferrer">
            Angu Praveen MS
        </a>
      </div>

      <div className="github-stats">
        <span>
            Inspired by
          <a href="https://github.com/bchiang7/v4" target="_blank" rel="noreferrer">
              Brittany Chiang
          </a>
        </span>
      </div>
    </StyledCredit>
  </StyledFooter>
);

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
