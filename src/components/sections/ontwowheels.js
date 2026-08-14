import React from 'react';
import styled from 'styled-components';
import { withPrefix } from 'gatsby';

const StyledSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      display: block;
    }
  }
`;

const StyledText = styled.div`
  p {
    font-size: var(--fz-lg);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 30px;
    margin-bottom: 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  ul {
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;
    font-size: var(--fz-lg);

    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 12px;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-xl);
        line-height: 12px;
      }
    }
  }

  .personal-journey {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid var(--lightest-navy);
  }
`;

const StyledPic = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 50px;
  }

  .img-wrapper {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: var(--transition);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: grayscale(100%) contrast(1.1);
      transition: var(--transition);

      &:hover {
        filter: none;
      }
    }
  }

  .img-wrapper:first-child {
    grid-column: 1 / -1;
  }
`;

const OnTwoWheels = () => (
  <StyledSection id="ontwowheels">
    <h2 className="numbered-heading">Beyond Engineering</h2>

    <div className="inner">
      <StyledText>
        <div>
          <p>
            Beyond engineering, I have built and led one of South India’s most active motorcycle
            touring communities. The work sharpened the leadership skills I use in engineering:
            planning, stakeholder coordination, risk management, and calm decision-making.
          </p>

          <h3>Community Leadership (Since 2013)</h3>

          <p>
            As <strong>Lead Administrator</strong> for a community of{' '}
            <strong>3,000+ members</strong>, I coordinated people, plans, and safety across rides
            and events.
          </p>

          <ul>
            <li>Led groups of 30–100+ riders through shared routes and safety briefings.</li>
            <li>Planned logistics and risk controls for multi-day expeditions.</li>
            <li>Coordinated events, resolved conflicts, and handled on-road contingencies.</li>
          </ul>
        </div>

        <div className="personal-journey">
          <h3>Personal Journey</h3>

          <p>
            Outside of community leadership, I’ve explored most major regions of India on a
            motorcycle. They strengthened my endurance, adaptability, and ability to navigate
            unfamiliar and unpredictable environments.
          </p>
        </div>
      </StyledText>

      <StyledPic>
        <div className="img-wrapper">
          <img src={withPrefix('/biking/group1.jpeg')} alt="Group Expeditions" />
        </div>

        <div className="img-wrapper">
          <img src={withPrefix('/biking/group2.jpeg')} alt="Community Events" />
        </div>

        <div className="img-wrapper">
          <img src={withPrefix('/biking/solo.jpeg')} alt="Solo Journeys" />
        </div>
      </StyledPic>
    </div>
  </StyledSection>
);

export default OnTwoWheels;
