import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Users = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allUsersJson {
        nodes {
          id
          name
          nationality
          username
        }
      }
    }
  `);

  console.log(data);
  return (
    <div>
      {data.allUsersJson.nodes.map(user => {
        return (
          <div style={{}} key={user.id}>
            <h3>Name: {user.name}</h3>
            <span>Username: {user.username}</span>
            <p>From: {user.nationality}</p>
            <button>Update User</button>
            <button style={{ margin: '0 10px' }}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
