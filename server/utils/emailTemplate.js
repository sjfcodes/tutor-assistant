const { Meeting, Student, Tutor } = require('../models');

module.exports = {
  getTemplateProperties: async (includePropertiesFor) => {
    const populated = {};

    const doNotInclude = {
      _id: true,
      __v: true,
      createdAt: true,
      'sendGrid.accessToken': true,
    };

    const getPropertiesFor = (Model) => {
      const object = {};
      Model.schema.eachPath((property) => {
        if (!doNotInclude[property]) object[property] = property;
      });
      return object;
    };

    const functionFor = {
      meeting: () => getPropertiesFor(Meeting),
      student: () => getPropertiesFor(Student),
      tutor: () => getPropertiesFor(Tutor),
    };

    Object
      .keys(includePropertiesFor)
      .forEach((model) => {
        if (includePropertiesFor[model]) {
          populated[model] = functionFor[model]();
        }
      });

    return populated;
  },
};
