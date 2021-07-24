const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
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

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: String): Book
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: String!, authors: String, description: String!, image: String, link: String, title: String!): User
    deleteBook(bookId: String!): User
  }

  type savedBook {
    bookId: String
    authors: String
    description: String
    image: String
    link: String
    title: String
  }

`;

module.exports = typeDefs;
