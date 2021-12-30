const axios = require('axios');
const { getISOCurrentDateStamp } = require('./dateTime');
const { getCalendlyToken, decryptToken } = require('./encryption');

const getCalendlyHeaders = (token) => ({
  authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

module.exports = {
  getCalendlyHeaders,
  /**
   *
   * @param {Object} req
   * @param {String} minstartTime ISO8601 string for event start date
   * @returns {Array} events with invitee info
   */
  getCalendlyEvents:
   ({ _id, accountKey, uri }, minstartTime = getISOCurrentDateStamp()) => new Promise(
     (resolve, reject) => {
     //  get & decrypt accountKey (users password)
       const userPw = decryptToken(accountKey, process.env.JWT_SECRET);

       // use account key to get & decrypt calendly token
       getCalendlyToken(_id, userPw)
         .then((decryptedToken) => {
         // get calendly events
           axios.get(
             'https://api.calendly.com/scheduled_events',
             {
               headers: getCalendlyHeaders(decryptedToken),
               params: {
                 user: uri,
                 // count: 10,
                 min_start_time: minstartTime,
               },
             },
           )
             .then(({ data: { collection } }) => Promise
               .all(collection
                 .map(async (event) => {
                   const i = await axios
                     .get(`${event.uri}/invitees`, { headers: getCalendlyHeaders(decryptedToken) })
                     .then(({ data }) => data.collection[0])
                     .catch((error) => console.error(error));

                   return {
                     _id: event.uri,
                     eventName: event.name,
                     startTime: event.start_time,
                     endTime: event.end_time,
                     status: event.status,
                     cancelUrl: i.cancel_url,
                     email: i.email,
                     studentName: i.name,
                     questionsAndAnswers: i.questions_and_answers,
                     rescheduleUrl: i.reschedule_url,
                     rescheduled: i.rescheduled,
                     timeZoneName: i.timezone,
                     updatedAt: i.updated_at,
                     createdAt: event.created_at,
                   };
                 })))
             .then((data) => resolve(data))
             .catch((error) => reject(error));
         })
         .catch((error) => reject(error));
     },
   ),
};
