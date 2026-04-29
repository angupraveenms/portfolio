import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 60px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  p {
    text-align: justify;
    font-size: var(--fz-xl);
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: transparent;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      transition: var(--transition);
      filter: grayscale(100%) contrast(1.1);
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['ANSYS', 'ABAQUS', 'Python', 'MATLAB', 'SQL / VBA', 'C / C++'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Over the past 4+ years, I’ve worked on simulation-driven product development across
              semiconductor, automotive, aerospace, and marine industries.
            </p>

            <p>
              My work has ranged from optimizing cooling circuits for EUV lithography systems, to
              automating strength verification workflows for automotive steering components, to
              improving aerodynamic efficiency in long-range aircraft design.
            </p>

            <p>
              I enjoy bridging physics-based engineering with automation and AI—building tools and
              workflows that reduce manual effort, accelerate design iterations, and improve
              decision-making.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpeg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Angu Praveen Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
