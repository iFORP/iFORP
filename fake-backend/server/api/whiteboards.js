'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'whiteboards',
    urls: [
        {
            params: '/list/{projectId}',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/list.json'
            }]
        },
        {
            params: '/list/14',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/list-14.json'
            }]
        },
        {
            params: '/details/{whiteboardId}',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/details.json'
            }]
        },
        {
            params: '/details/1',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/details-1.json'
            }]
        },
        {
            params: '/details/2',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/details-2.json'
            }]
        },
        {
            params: '/create/{projectId}',
            requests: [{
                /**
                 * Payload:
                 * {
                 *   name: string
                 * }
                 */
                method: 'POST',
                response: '/response-files/whiteboards/create.json'
            }]
        }
    ]
});
