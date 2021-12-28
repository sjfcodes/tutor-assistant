const axios = require('axios');
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
  getCalendlyEvents: (
    req,
    minstartTime = new Date().toISOString(),
  ) => new Promise((resolve, reject) => {
    //  get & decrypt accountKey (users password)
    const userPw = decryptToken(req.tutor.accountKey, process.env.JWT_SECRET);

    // use account key to get & decrypt calendly token
    getCalendlyToken(req.tutor._id, userPw)
      .then((decryptedToken) => {
        // get calendly events
        axios.get(
          'https://api.calendly.com/scheduled_events',
          {
            headers: getCalendlyHeaders(decryptedToken),
            params: {
              user: req.body.uri,
              // count: 10,
              min_start_time: minstartTime,
            },
          },
        )
          .then(({ data: { collection } }) => Promise
            .all(collection
              .map(async (event) => {
                const inviteeInfo = await axios
                  .get(`${event.uri}/invitees`, { headers: getCalendlyHeaders(decryptedToken) })
                  .then(({ data }) => data.collection)
                  .catch((error) => console.error(error));

                return {
                  startTime: event.start_time,
                  endTime: event.end_time,
                  student: inviteeInfo,
                  status: event.status,
                };
              })))
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  }),
};
