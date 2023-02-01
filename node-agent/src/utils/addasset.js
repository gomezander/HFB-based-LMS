'use strict';

const addasset = require('../../../blockchain/asset-transfer-basic/application-javascript/addasset.js');

module.exports = async function addassetBchain(method, id, key, value){

	addasset(method, id, key, value);

}