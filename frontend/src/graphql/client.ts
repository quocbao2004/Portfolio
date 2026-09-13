type GraphQLError = {
  message: string
}

type GraphQLResponse<TData> = {
  data?: TData
  errors?: GraphQLError[]
}

type GraphQLRequestOptions<TVariables> = {
  query: string
  variables?: TVariables
}

const GRAPHQL_ENDPOINT = '/graphql/'

export async function graphqlRequest<TData, TVariables = Record<string, never>>({
  query,
  variables,
}: GraphQLRequestOptions<TVariables>) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  })

  const result = (await response.json()) as GraphQLResponse<TData>

  if (!response.ok || result.errors?.length) {
    throw new Error(result.errors?.[0]?.message ?? 'GraphQL request failed.')
  }

  if (!result.data) {
    throw new Error('GraphQL response is missing data.')
  }

  return result.data
}
