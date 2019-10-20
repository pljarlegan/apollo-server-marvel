const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    characters: ( parent, { limit = 10, offset = 0 }, { dataSources: { CharacterRESTDataSource } }, info) => CharacterRESTDataSource.characters({ limit, offset }),
    character: ( parent, { id }, { dataSources: { CharacterRESTDataSource } }, info ) => CharacterRESTDataSource.findCharacterById(id).then(character => character ? character : new ApolloError("Character not found.", "RESOURCE_NOT_FOUND")),
  },

};

module.exports = resolvers;
