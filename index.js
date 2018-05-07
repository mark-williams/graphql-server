const { graphql, buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

/* eslint-disable no-console */
const PORT = process.env.port || 3000;
const server = express();

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

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
  })
);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
