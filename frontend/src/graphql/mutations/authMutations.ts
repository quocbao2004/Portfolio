export const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      message
      user {
        id
        username
        email
        isSuperAdmin
      }
    }
  }
`
