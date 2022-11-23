export const typeDefs = `#graphql

   type User {
     id:ID!
     name: String!
     username: String!
     age: Int!
     nationality: String!  
     
  }


   type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  input CreateUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: String!
  }

  input updateUserInput{
    id: ID!
    newName: String!
    newUsername: String!
    newAge: Int!
    newNationality: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: updateUserInput!): User
    deleteUser(id: ID!): User
  }
 
`;
