const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    comics: ( parent, { limit = 10, offset = 0 }, { dataSources: { ComicRESTDataSource } }, info) => ComicRESTDataSource.comics({ limit, offset }),
    comic: ( parent, { id }, { dataSources: { ComicRESTDataSource } }, info ) => ComicRESTDataSource.findComicById(id).then(comic => comic ? comic : new ApolloError("Comic not found.", "RESOURCE_NOT_FOUND")),
  },

};

module.exports = resolvers;
