# Sanity Content Studio

Sanity Content Studio is an open source real-time content editing environment connected to the Sanity backend.

[Read the docs](https://www.sanity.io/docs/content-studio/)
[Graphql Guide](https://www.sanity.io/docs/graphql)

<mdzhang.com> uses a Sanity-powered GraphQL backend to fetch content.

## Development

Start the studio:

`yarn dev`

## Data

Reimport books data:

```sh
cd data
./sync.sh
```

Redeploy:

```sh
yarn deploy-graphql
yarn deploy
```
