import { getLocalDateString } from '.';

/* eslint-disable no-continue */
export const formatEmailTemplates = (templates) => {
  if (!templates.length) return {};
  const templateObj = {};
  templates.forEach((template) => {
    const key = template._id;
    templateObj[key] = { ...template };
  });
  return templateObj;
};

/**
 * @param {String} str text to iterate through
 *
 * sliding window text replacement
 * iterate through str,
 * find the text patterns & replace with object properties
 *
 * Example data:
 * const data = {
 *   student: {
 *       firstName: 'Sam',
 *       lastName: 'Fox',
 *   },
 *   meeting: {
 *       startDate: new Date().toISOString()
 *   }
 * }
 *
 * const str = `Welcome, [student-firstName] [student-lastName]!
 Our meeting is on [meeting-startDate]`
 *
 *      head              tail
 *       |    divider      |
 *       ↓       ↓         ↓
 *       [student-firstName]
 *           ↑       ↑
 *           |       |
 *          key    value
 *             \   /
 *               ↓
 *            property
 *
 * @returns {
 *   {
 *     text: String,
 *     errors: Array
 *   }
 * }
 */

export const buildTemplatePreview = ({ text: str, data }) => {
  if (!str || typeof str !== 'string') return 'not a string';
  let text = str;
  let head;
  let divider;
  const errors = [];
  const resetData = () => {
    head = null;
    divider = null;
  };

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (char === '[') head = i;
    if (char === '-') divider = i;
    /**
         * when a tail is found,
         * verify head and divider
         * get key
         * get value
         * verify property
         * swap text
         * clear variables
         */
    if (char === ']') {
      if (!head || !divider) continue;
      const key = str.substring(head + 1, divider);
      const value = str.substring(divider + 1, i);
      const targetText = str.substring(head, i + 1);

      if (!key
        || !value
        || !targetText
        || !data[key]
        || !data[key][value]) {
        errors.push(targetText);
        continue;
      }

      let property = data[key][value];
      if (value === 'startTime' || value === 'graduationDate') property = getLocalDateString(property);

      text = text.replace(targetText, property);
      resetData();
    }
  }

  return { text, errors };
};
