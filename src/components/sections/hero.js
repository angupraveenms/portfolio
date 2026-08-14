import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { withPrefix } from 'gatsby'; // <-- 1. Imported withPrefix here

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    /* Reduced from clamp(40px, 8vw, 70px) to a smaller range */
    font-size: clamp(30px, 6vw, 50px);

    @media (max-width: 480px) {
      margin-bottom: 20px;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    text-align: justify;
    text-justify: inter-word;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Computational Engineer · PhD Researcher</h1>;
  const two = <h2 className="big-heading">Angu Praveen</h2>;
  const three = (
    <h3 className="big-heading">From complex physics to practical engineering decisions.</h3>
  );
  const four = (
    <>
      <p>
        I bridge the gap between complex simulation and efficient engineering. Specializing in FEA,
        CFD, and automation, I build repeatable workflows that reduce manual effort and turn raw
        structural, thermal, and fluid data into smarter design decisions. Currently researching the
        mechanics of fibrous paper materials as a PhD candidate at TU Darmstadt.
      </p>
    </>
  );

  // <-- 2. Wrapped the href path in withPrefix() below
  const five = (
    <a className="email-link" href={withPrefix('/resume.pdf')} target="_blank" rel="noreferrer">
      Download Resume
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
