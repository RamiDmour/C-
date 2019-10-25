const elasticsearch = require('elasticsearch');
const fs = require('fs');
var esClient = new elasticsearch.Client({
  hosts: [ 'http://localhost:9200']
});

const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.title
      }
    });

    bulkBody.push(item);
  });

  esClient.bulk({body: bulkBody})
  .then(response => {
    console.log('here');
    let errorCount = 0;
    response.items.forEach(item => {
      if (item.index && item.index.error) {
        console.log(++errorCount, item.index.error);
      }
    });
    console.log(
      `Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
    );
  })
  .catch(console.err);
};

const test = function test() {
  const articles = fs.readFileSync('10.0.json');
  bulkIndex('documents', 'document', JSON.parse(articles));
};

test();

module.exports = {
    bulkIndex
};
