const { graphql, buildSchema } = require('graphql');

/* eslint-disable no-console */
const schema = buildSchema(`
  type Query {
    id: ID,
    name: String,
    enabled: Boolean
  }

  type Schema {
    query: Query
  }
`);

const resolvers = {
  id: () => 1007,
  name: () => 'Will',
  enabled: () => true
};

const query = `
  query myQuery {
    id
    name
    enabled
  }
`;

graphql(schema, query, resolvers).then(x => console.log(x));
