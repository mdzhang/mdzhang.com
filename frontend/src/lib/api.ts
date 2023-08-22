const GRAPHQL_API_BASE_URL = 'https://n3ww3z3p.api.sanity.io/v1/graphql/production/default'

export async function getSanityContent({ query, variables = {} }: { query: string, variables?: Record<string, any> }) {
  const { data } = await fetch(
    GRAPHQL_API_BASE_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  ).then((response) => response.json());

  return data;
}

export async function getPosts() {
  return getSanityContent({
    query: `
      {
        allPost {
          title
          slug {
            source
          }
          bodyRaw
          author {
            name
          }
          tags {
            name
          }
          publishedAt
        }
      }`
  });
};


