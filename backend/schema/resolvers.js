import { UserList } from '../data/userData.js';
import _ from 'lodash';

export const resolvers = {
  Query: {
    users: () => UserList,
    user(parent, args, context, info) {
      const id = args.id;
      const user = _.find(UserList, { id: +id });
      return user;
    },
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const user = args.input;
      const lastUserId = UserList[UserList.length - 1].id;
      user.id = lastUserId + 1;
      UserList.push(user);
      return user;
    },

    updateUser: (parent, args, context, info) => {
      const { id, newName, newUsername, newAge, newNationality } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === +id) {
          user.name = newName;
          user.username = newUsername;
          user.age = newAge;
          user.nationality = newNationality;
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    deleteUser: (parent, args, context, info) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === +id);
      return null;
    },
  },
};
