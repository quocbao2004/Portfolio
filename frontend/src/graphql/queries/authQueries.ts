export const CURRENT_USER_QUERY = `
  query CurrentUser {
    currentUser {
      id
      username
      email
      isSuperAdmin
    }
  }
`
