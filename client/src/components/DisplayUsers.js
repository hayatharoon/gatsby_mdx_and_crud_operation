import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Modal from '../components/Modal/Modal';

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      age
      nationality
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// const EDIT_USER = gql`
//   mutation UpdateUser($input: updateUserInput!) {
//     updateUser(input: $input) {
//       id
//       newName
//       newUsername
//       newAge
//       newNationality
//     }
//   }
// `;

const DisplayUsers = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  // const [updateUser] = useMutation(EDIT_USER);

  const openModal = id => {
    setIsOpen(true);
    setEditId(id);
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <p>Error : {error}</p>;
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="name..."
            onChange={e => {
              setName(e.target.value);
            }}
            style={{
              marginBottom: '10px',
              borderRadius: '5px',
              padding: '3px',
              marginRight: '5px',
            }}
          />
          <input
            type="text"
            placeholder="username..."
            onChange={e => {
              setUsername(e.target.value);
            }}
            style={{
              marginBottom: '10px',
              borderRadius: '5px',
              padding: '3px',
            }}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="age..."
            onChange={e => {
              setAge(e.target.value);
            }}
            style={{
              marginBottom: '10px',
              borderRadius: '5px',
              padding: '3px',
              marginRight: '5px',
            }}
          />
          <input
            type="text"
            placeholder="nationality..."
            onChange={e => {
              setNationality(e.target.value);
            }}
            style={{
              marginBottom: '10px',
              borderRadius: '5px',
              padding: '3px',
            }}
          />
        </div>

        <button
          style={{
            marginBottom: '10px',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: +age,
                  nationality,
                },
              },
            });
            alert('Successfully create user!');
            refetch();
          }}
        >
          Create User
        </button>
      </div>

      {data &&
        data.users.map(({ id, name, username, age, nationality }) => (
          <div key={id}>
            <h4>Name: {name}</h4>
            <span>Username: {username}</span>
            <p>Age: {age}</p>
            <p>From: {nationality}</p>
            <button onClick={() => openModal(id)}>Update User</button>
            {isOpen && <Modal id={editId} setIsOpen={setIsOpen} />}
            <button
              onClick={() => {
                deleteUser({
                  variables: {
                    id: id,
                  },
                });
                alert('Successfully delete user!');
                refetch();
              }}
              style={{ margin: '0 10px' }}
            >
              Delete User
            </button>
          </div>
        ))}
    </div>
  );
};

export default DisplayUsers;
