const formatEmailTemplates = (templates) => {
  if (!templates.length) return {};
  const templateObj = {};
  templates.forEach((template) => {
    const key = template._id;
    const values = { ...template };
    templateObj[key] = values;
  });
  return templateObj;
};

export default formatEmailTemplates;
