import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';

const BlogPostPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>{data.mdx.frontmatter.date}</p>
      <p>{data.mdx.excerpt}</p>
    </Layout>
  );
};
export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "dddd, MMMM Do YYYY")
      }
      excerpt
    }
  }
`;

export default BlogPostPage;
