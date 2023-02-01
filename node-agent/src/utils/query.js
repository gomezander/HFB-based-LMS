'use strict';

const query = require('../../../blockchain/asset-transfer-basic/application-javascript/query.js');

module.exports =  async function queryBchain(method, identity){

	query(method, identity);

}