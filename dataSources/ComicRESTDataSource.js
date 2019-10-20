const { compact } = require("lodash");
const { RESTDataSource } = require("apollo-datasource-rest");

class ComicRESTDataSource extends RESTDataSource {

  comics({ limit, offset }) {
    return this.context.marvel.comics
      .findAll(limit, offset)
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        return res;
      });
  }

  findComicById(id) {
    return this.context.marvel.comics.find(id)
      .then((res) => res.data.shift());
  }

  async findComicByIds(ids) {
    let comics = ids.map(id => this.findComicById(id));
    return Promise.all(comics).then(([...results]) => compact(results));
  }

}

module.exports = ComicRESTDataSource;
