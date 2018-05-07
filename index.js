const { graphql, buildSchema } = require('graphql');

/* eslint-disable no-console */
const schema = buildSchema(`
type Person {
  id: ID,
  name: String,
  enabled: Boolean
  }

  type Query {
    person: Person
  }

  type Schema {
    query: Query
  }
`);

const resolvers = {
  person: () => ({
    id: 1007,
    name: 'Will',
    enabled: true
  })
};

const query = `
  query myQuery {
    person {
      id
      name
      enabled
    }
  }
`;

graphql(schema, query, resolvers).then(x => console.log(x));
