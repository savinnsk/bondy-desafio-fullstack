import gql from 'graphql-tag'

export default gql`

  type User {
  name: String,
  email: String,
  company: String
}


  input CreateUserInput {
    name: String!
    email: String!
    company: String
    password: String! 
  }

  type AuthPayload {
    user : User!,
    token: String!
  }

  type Mutation {
    login(emailDto: String!, passwordDto: String!): AuthPayload,
    create(user: CreateUserInput!): User
  }

`
