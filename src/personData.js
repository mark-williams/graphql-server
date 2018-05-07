const personData = [
  { id: 'A1007', name: 'Will', enabled: true },
  { id: 'A1008', name: 'Joe', enabled: false },
  { id: 'A1009', name: 'Julie', enabled: true }
];

const getPersonById = id => {
  const [results] = personData.filter(p => p.id === id);
  return results;
};

const getAll = () => {
  return personData;
};

module.exports = {
  getPersonById,
  getAll
};
