import { request, gql } from 'graphql-request'

const GRAPHQL_API_BASE_URL = 'https://n3ww3z3p.api.sanity.io/v1/graphql/production/default'

const POST_QUERY = gql`
{
  allBook(where: {readAt: {gt:"2022-01-01T00:00:00Z"}}) {
    title
  }
}
`

export const getPosts = async () => request(`${GRAPHQL_API_BASE_URL}/`, POST_QUERY)
