const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// fake data
const books = [
  {
    title: "Harry Potter and the Sorceror's Stone",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
]

const posts = [
  {
    title: "Check out this cool list",
    list: ["item 1", "item 2", "item 3", "item 4", "item 5"]
  },
  {
    title: "A cool list for cool people",
    list: ["item 1", "item 2", "item 3", "item 4", "item 5"]
  }
]

// The GraphQL string form
  const typeDefs = `
    type Query { 
      books: [Book]
      posts: [Post]
      users: [User]
    }
    type Book { title: String }
    type Post {
      title: String
      list: [String!]
    }
    type User {
      name: String
      email: String
      password: String
    }
    type Mutation {
      addBook(title: String!): Book
    }
  `

// resolvers
const resolvers = {
  Query: {
    books: () => books,
    posts: () => posts
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { title: args.title }
      books.push(newBook)
      return newBook
    }
  }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// initialize
const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointUrl: '/graphql' }))

app.listen(3000, () => {
  console.log('goto http://localhost:3000 to run queries')
})
