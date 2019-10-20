const { ApolloServer, ApolloError } = require("apollo-server");
const GraphQLHelper = require("./helpers/graphql");
const api = require("marvel-api");
const colors = require("colors");

const server = new ApolloServer({
  typeDefs: GraphQLHelper.typeDefs,
  schemaDirectives: GraphQLHelper.schemaDirectives,
  resolvers: GraphQLHelper.resolvers,
  dataSources: () => GraphQLHelper.dataSources,
  context: () => {
    let { NODE_ENV, PRIVATE_KEY, PUBLIC_KEY } = process.env;

    if (NODE_ENV === "production" && !PRIVATE_KEY) {
      throw new ApolloError(
        "You have not set the `PRIVATE_KEY` environment variable !"
      );
    }
    if (NODE_ENV === "production" && !PUBLIC_KEY) {
      throw new ApolloError(
        "You have not set the `PUBLIC_KEY` environment variable !"
      );
    }

    const marvel = api.createClient({
      publicKey: PUBLIC_KEY,
      privateKey: PRIVATE_KEY,
    });
    return {
      marvel,
    };
  }
});

server.listen().then(({ url }) => {
  console.log("🚀".red + " Server ready at ".bold.red + url);
});
