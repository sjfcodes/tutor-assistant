const formatEmailTemplates = (templates) => {
  if (!templates.length) return {};
  const templateObj = {};
  templates.forEach((template) => {
    const key = template._id;
    templateObj[key] = { ...template };
  });
  return templateObj;
};

export default formatEmailTemplates;
