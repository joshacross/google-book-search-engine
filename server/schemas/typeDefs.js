const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

type Book {
    bookId: String
    authors: String
    description: String
    image: String
    link: String
    title: String
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(_id: ID!): Book
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: String!, authors: String, description: String!, image: String, link: String, title: String!): User
    deleteBook(bookId: String!, authors: String, description: String!, image: String, link: String, title: String!): User

    type Auth {
        token: ID!
        user: User
    }
}
`;

module.exports = typeDefs;
