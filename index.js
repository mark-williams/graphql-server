const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { getPersonById, getAll } = require('./src/personData');

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
      args: {
        id: { type: GraphQLNonNull(GraphQLID), description: 'Id of person' }
      },
      resolve: (_, args) => Promise.resolve(getPersonById(args.id))
    },
    people: {
      type: peopleType,
      description: 'List of people',
      resolve: () => Promise.resolve(getAll())
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
