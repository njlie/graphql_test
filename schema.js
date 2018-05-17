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