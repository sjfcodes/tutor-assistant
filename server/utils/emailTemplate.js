const doNotInclude = {
  _id: true,
  __v: true,
  createdAt: true,
  'sendGrid.accessToken': true,
  courses: true,
  students: true,
};

module.exports = {
  async getPropertiesFor(Model) {
    const store = {};
    const modelName = Model.modelName.toLowerCase();
    Model.schema.eachPath((property) => {
      if (!doNotInclude[property]) store[property] = `(${modelName}'s ${property})`;
    });
    return store;
  },
};
