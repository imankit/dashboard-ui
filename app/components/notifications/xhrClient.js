'use strict';

const Axios = require('axios');

export const xhrClient = Axios.create({withCredentials: true});
