const { compact } = require("lodash");
const { RESTDataSource } = require("apollo-datasource-rest");

class CharacterRESTDataSource extends RESTDataSource {

  characters({ limit, offset }) {
    return this.context.marvel.characters
      .findAll(limit, offset)
      .then((res) => {
        // console.log(JSON.stringify(res, null, 2));
        return res;
      });
  }

  findCharacterById(id) {
    return this.context.marvel.characters.find(id)
      .then((res) => res.data.shift());
  }

  async findCharacterByIds(ids) {
    let characters = ids.map(id => this.findCharacterById(id));
    return Promise.all(characters).then(([...results]) => compact(results));
  }

}

module.exports = CharacterRESTDataSource;
