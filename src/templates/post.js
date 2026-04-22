import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 150px 20px;

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }
`;

const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;
  color: var(--slate);
  font-size: var(--fz-xl);
  line-height: 1.6;
  text-align: justify;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
    color: var(--lightest-slate);
  }

  p {
    margin: 1em 0;
  }

  strong {
    color: var(--white);
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }
`;

const PostTemplate = ({ data, location }) => {
  // If data is missing, Gatsby hasn't finished the handshake
  if (!data || !data.markdownRemark) {
    return null;
  }

  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={`${title} | Portfolio`} />
      <StyledPostContainer>
        <div className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/">Back to Home</Link>
        </div>

        <StyledPostHeader>
          <h1 className="medium-heading">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {tags && tags.length > 0 && (
              <>
                <span>&nbsp;&mdash;&nbsp;</span>
                {tags.map((tag, i) => (
                  <Link key={i} to={`/pensieve/tags/${kebabCase(tag)}/`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </>
            )}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default PostTemplate;

// This query looks for the slug passed from gatsby-node.js
export const pageQuery = graphql`
  query GetPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
