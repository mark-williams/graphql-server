const { graphql, buildSchema } = require('graphql');

/* eslint-disable no-console */
const schema = buildSchema(`
  type Query {
    foo: String
  }

  type Schema {
    query: Query
  }
`);

const resolvers = {
  foo: () => 'bar'
};

const query = `
  query myQuery {
    foo
  }
`;

graphql(schema, query, resolvers).then(x => console.log(x));
