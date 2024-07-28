# bondy-desafio-fullstack

### exemple mutation

```js

mutation($emailDto: String!, $passwordDto: String!){
  login(emailDto: $emailDto, passwordDto: $passwordDto) {
    user{
      name,
      email,
      company
    }
    ,token
  }
}



//create

mutation($user: CreateUserInput!){
  create(user: $user) {
    name
    email
    company
  }
}

``` 