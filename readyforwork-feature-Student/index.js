const concurrently = require('concurrently');
const getCommand = (service) => `cd ${service} && npm start`;

concurrently([
    'npm:watch-*',
    { command: getCommand(`example-service`), name: ''},
    { command: getCommand(`auth-service`), name: ''},
    { command: getCommand(`UI`), name: '' },
], {
    prefix: 'none',
    killOthers: ['failure', 'success'],
    restartTries: 3,
});