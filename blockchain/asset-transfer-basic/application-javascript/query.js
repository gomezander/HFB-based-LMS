/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
//const FabricCAServices = require('fabric-ca-client');
const path = require('path');
//const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}


module.exports = async function query(method, identity) {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();


		const wallet = await buildWallet(Wallets, walletPath);


		const gateway = new Gateway();

		try {

			await gateway.connect(ccp, {
				wallet,
				identity: identity,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);



			// Let's try a query type operation (function).
			// This will be sent to just one peer and the results will be shown.
			console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			var result = await contract.evaluateTransaction(method);
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);


		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			gateway.disconnect();
		}
        return result.toString();
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
        return error;
	}
}

//main();