/* eslint-disable */
const functions = require('firebase-functions');
const axios = require('axios');

exports.getImage = functions.https.onRequest(async (request, response) => {
    await axios({
        method:'get',
        url: 'http://www.mairiedehouat.fr/upload/galerie/image/tal.jpg',
        responseType: 'blob'
    }).then((rep) => {
        response.send(rep.data);
    }).catch(err => {
        console.log('ERROR')
    })
});
