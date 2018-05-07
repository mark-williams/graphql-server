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
    people: [Person]
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
  }),
  people: () => [
    { id: 1007, name: 'Will', enabled: true },
    { id: 1008, name: 'Joe', enabled: false },
    { id: 1009, name: 'Julie', enabled: true }
  ]
};

const query = `
  query myQuery {
    people {
      id
      name
      enabled
    }
  }
`;

graphql(schema, query, resolvers).then(x => console.log(x.data));
