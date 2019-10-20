# Apollo Server Marvel

Provide Graphql Endpoint for Marvel API

## How to use it
- `cp .env.sample .env`
- edit .env file > set all needed keys
- `docker-compose up -d`

## schema available [here](http://127.0.0.1:4000)

## Request sample
```graphql
{
  character(id:"1009149") {
    name
    description
  }
  characters(limit: 1, offset: 7) {
    meta {
      offset
      limit
      total
      count
    }
    data {
      id
      name
      comics {
        items {
          name
        }
      }
      description
      resourceURI
      thumbnail {
        path
        extension
      }
    }
  }
}
```
```graphql
{
  comic(id: 1158) {
    title
  }
  comics(limit: 5, offset: 5) {
    data {
      id
      title
      description
    }
    meta {
      offset
      limit
      total
      count
    }
  }
}
```
