const formatEmailTemplates = (templates) => {
  if (!templates.length) return {};
  const templateObj = {};
  templates.forEach((template) => {
    const key = template._id;
    const values = { ...template, values: JSON.parse(template.values.split('\'').join('"')) };
    templateObj[key] = values;
  });
  return templateObj;
};

export default formatEmailTemplates;
