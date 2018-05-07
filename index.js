const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

/* eslint-disable no-console */
const PORT = process.env.port || 3000;
const server = express();

const personType = new GraphQLObjectType({
  name: 'Person',
  description: ' A person',
  fields: {
    id: { type: GraphQLID, description: 'Unique ID' },
    name: { type: GraphQLString, description: "Person's name" },
    enabled: {
      type: GraphQLBoolean,
      description: 'Denotes if person still active on system'
    }
  }
});

const peopleType = new GraphQLList(personType);

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    person: {
      type: personType,
      resolve: () =>
        Promise.resolve({
          id: 1007,
          name: 'Will',
          enabled: true
        })
    },
    people: {
      type: peopleType,
      description: 'List of people',
      resolve: () =>
        Promise.resolve([
          { id: 1007, name: 'Will', enabled: true },
          { id: 1008, name: 'Joe', enabled: false },
          { id: 1009, name: 'Julie', enabled: true }
        ])
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
