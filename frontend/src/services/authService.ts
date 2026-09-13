import { LOGIN_MUTATION } from '../graphql/mutations/authMutations'
import { CURRENT_USER_QUERY } from '../graphql/queries/authQueries'
import { graphqlRequest } from '../graphql/client'
import type { AuthUser, LoginInput, LoginResult } from '../types/auth'

type LoginMutationData = {
  login: LoginResult
}

type CurrentUserQueryData = {
  currentUser: AuthUser | null
}

export function login(input: LoginInput) {
  return graphqlRequest<LoginMutationData, LoginInput>({
    query: LOGIN_MUTATION,
    variables: input,
  }).then((data) => data.login)
}

export function getCurrentUser() {
  return graphqlRequest<CurrentUserQueryData>({
    query: CURRENT_USER_QUERY,
  }).then((data) => data.currentUser)
}
