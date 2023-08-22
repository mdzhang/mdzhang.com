import { request, gql } from 'graphql-request'
import type { Post } from '@src/gql/graphql';

const GRAPHQL_API_BASE_URL = 'https://n3ww3z3p.api.sanity.io/v1/graphql/production/default'

const POSTS_QUERY =  gql`
query {
  allPost {
    title
    slug {
      current
    }
    mainImage {
      asset {
        url
      }
    }
    author {
      name
    }
    tags {
      name
    }
    publishedAt
    body
    description
  }
}
`;

export const getPosts: () => Promise<Post[]> = async () => {
  const res = await request(GRAPHQL_API_BASE_URL, POSTS_QUERY);
  return res.allPost;
}
