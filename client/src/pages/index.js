import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Layout from '../components/layout';
import Seo from '../components/seo';
import DisplayUsers from '../components/DisplayUsers';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const BlogIndex = () => {
  
  return (
    <ApolloProvider client={client}>
      <Layout>
        <DisplayUsers />
      </Layout>
    </ApolloProvider>
  );
};

export default BlogIndex;

export const Head = () => <Seo title="All posts" />;
