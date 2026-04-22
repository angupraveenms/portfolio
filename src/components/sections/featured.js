import React, { useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledFeaturedSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  .numbered-heading {
    margin-bottom: 50px;
  }
`;

const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  /* PROJECT 1: Text Right, Image Left (OVERLAPPING) */
  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
    }
    .project-tech-list {
      justify-content: flex-end;
      @media (max-width: 768px) {
        justify-content: flex-start;
      }
      li {
        margin: 0 0 5px 20px;
        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;
      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  /* PROJECT 2: Text Left, Image Right (OVERLAPPING) */
  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    z-index: 2;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }
    @media (max-width: 768px) {
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    margin: 0 0 20px;
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    text-align: justify;

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    justify-content: flex-start;

    .learn-more-link {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 0 10px;
      font-size: var(--fz-xs);
      font-family: var(--font-mono);
    }
  }

  .project-image {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    .img-wrapper {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      display: block;
      position: relative;
      /* Mask removed as requested */
      &:before {
        content: none;
      }
    }

    .img {
      border-radius: var(--border-radius);
      transition: var(--transition);
      /* Color filters removed */
      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(0%) contrast(1) brightness(90%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    query {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        # CHANGED: Now sorting by weight instead of date
        sort: { fields: [frontmatter___weight], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED)
                }
              }
              tech
              slug
              weight # Added to ensure it is available in the data
            }
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges;
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {return;}
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFeaturedSection id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <div className="featured-container">
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter } = node;
            const { title, tech, cover, slug, description } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <p className="project-overline">Featured Project</p>
                  <h3 className="project-title">{title}</h3>

                  <div className="project-description">
                    <p>{description}</p>
                  </div>

                  {tech.length && (
                    <ul className="project-tech-list">
                      {tech.map((t, index) => (
                        <li key={index}>{t}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project-links">
                    {slug && (
                      <Link to={slug} className="learn-more-link">
                        Learn More
                      </Link>
                    )}
                  </div>
                </div>

                <div className="project-image">
                  <Link to={slug} className="img-wrapper">
                    <GatsbyImage image={image} alt={title} className="img" />
                  </Link>
                </div>
              </StyledProject>
            );
          })}
      </div>
    </StyledFeaturedSection>
  );
};

export default Featured;
