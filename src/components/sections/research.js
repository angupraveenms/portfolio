import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledResearchSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  .research-overline {
    margin-bottom: 15px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .research-intro {
    max-width: 760px;
    color: var(--light-slate);
    font-size: var(--fz-xl);
    line-height: 1.5;
  }

  .research-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 45px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .research-item {
    padding: 28px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);

    h3 {
      margin-bottom: 15px;
      font-size: var(--fz-xxl);
    }

    p {
      margin: 0;
      color: var(--light-slate);
      font-size: var(--fz-lg);
      line-height: 1.5;
    }
  }

  .research-tools {
    margin: 30px 0 0;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.7;

    span {
      color: var(--green);
    }
  }
`;

const Research = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledResearchSection id="research" ref={revealContainer}>
      <h2 className="numbered-heading">Research</h2>
      <p className="research-overline">MICROMECHANICS OF FIBROUS MATERIALS</p>
      <p className="research-intro">
        My PhD research at TU Darmstadt, within CRC 1767 PAPER, investigates how the microscopic
        architecture and mechanics of cellulose-fiber networks determine the macroscopic behaviour
        of next-generation paper materials.
      </p>

      <div className="research-grid">
        <article className="research-item">
          <h3>Microstructure to mechanics</h3>
          <p>
            I model individual fibers, fiber–fiber bonds, and three-dimensional network geometry to
            connect microstructure with effective material properties.
          </p>
        </article>
        <article className="research-item">
          <h3>Physics-based simulation</h3>
          <p>
            Nonlinear finite-element models capture finite deformation, inelasticity, damage,
            fracture, and humidity-dependent behaviour in fibrous networks.
          </p>
        </article>
        <article className="research-item">
          <h3>Data-driven material design</h3>
          <p>
            Simulation data and machine-learning methods support microstructure–property models,
            fast surrogate predictions, and computational material design.
          </p>
        </article>
      </div>

      <p className="research-tools">
        <span>Research toolbox:</span> MOOSE · Gmsh · GeoDict · Python · PyTorch · High-performance
        computing
      </p>
    </StyledResearchSection>
  );
};

export default Research;
