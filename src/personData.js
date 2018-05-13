const personData = [
  { id: 'A1000', name: 'Will', enabled: true },
  { id: 'A1001', name: 'Joe', enabled: false },
  { id: 'A1002', name: 'Julie', enabled: true }
];

const getPersonById = id => {
  const [results] = personData.filter(p => p.id === id);
  return results;
};

const getAll = () => {
  return personData;
};

const getId = () => `A${1000 + personData.length}`;

const createPerson = ({ name, enabled }) => {
  const person = {
    id: getId(),
    name,
    enabled
  };

  personData.push(person);
  return person;
};

module.exports = {
  getPersonById,
  getAll,
  createPerson
};
