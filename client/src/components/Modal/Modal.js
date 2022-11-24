import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { RiCloseLine } from 'react-icons/ri';
import * as styles from './Modal.module.css';

const EDIT_USER = gql`
  mutation UpdateUser($input: updateUserInput!) {
    updateUser(input: $input) {
      id
      name
      username
      age
      nationality
    }
  }
`;

const Modal = ({ id, setIsOpen }) => {
  const [newName, setNewName] = useState('');
  const [newUsername, setnewUsername] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newnationality, setNewNationality] = useState('');
  const [updateUser] = useMutation(EDIT_USER);
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={styles.modalContent}>
            <div>
              <input
                type="text"
                placeholder="name..."
                onChange={e => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="username..."
                onChange={e => setnewUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="age..."
                onChange={e => setNewAge(e.target.value)}
              />
              <input
                type="text"
                placeholder="nationality..."
                onChange={e => setNewNationality(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  updateUser({
                    variables: {
                      input: {
                        id: id,
                        name: newName,
                        username: newUsername,
                        age: +newAge,
                        nationality: newnationality,
                      },
                    },
                  });
                  alert('Successfully delete user!');
                  setIsOpen(false);
                }}
              >
                Update User
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
