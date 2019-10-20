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
    let { PRIVATE_KEY, PUBLIC_KEY } = process.env;

    if (!PRIVATE_KEY) {
      throw new ApolloError(
        "You have not set the `PRIVATE_KEY` environment variable !"
      );
    }
    if (!PUBLIC_KEY) {
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
let { PRIVATE_KEY, PUBLIC_KEY } = process.env;

if (!(PRIVATE_KEY && PUBLIC_KEY)) {
  return console.log("Unable to start server : config is missing".bold.red);
}
server.listen().then(({ url }) => {
  console.log("🚀".red + " Server ready at ".bold.red + url);
});
