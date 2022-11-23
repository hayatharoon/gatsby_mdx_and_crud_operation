import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../../components/layout';


const blog = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <h2 style={{ color: 'purple' }}>All Blogs</h2>
      {data.allMdx.nodes.map(blog => {
        return (
          <article key={blog.id}>
            <Link
              to={`${blog.frontmatter.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <h2 style={{ color: 'blue' }}>{blog.frontmatter.title}</h2>
            </Link>
            <p>{blog.frontmatter.date}</p>
          </article>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "dddd, MMMM Do YYYY")
          slug
        }
        id
      }
    }
  }
`;
export default blog;
