  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const search = function search(query) {
    let index = "docs";
    let body = {
      size: 1000,
      from: 0,
      query: {
        multi_match: {
          query: query,
          type: "best_fields",         
          fields: ['name^4', 'content'],
          fuzziness: "AUTO"
        }
      }
    }
      return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let query = "RPA";
    console.log(`retrieving documents whose title or authors match '${query}' (displaying 50 items at a time)...`);
    search(query)
      .then(results => {
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        if (results.hits.total > 0) console.log(`returned article titles:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t${0 + ++index} - ${hit._source.name} (score: ${hit._score})`));
      })
    .catch(console.error);
  };

  // test();

  module.exports = search;
