import 'babel-polyfill';

import KcAdminClient from 'keycloak-admin';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const kcAdminClient = new KcAdminClient();

// Authorize with username / password
const checkRealmRegister = async () => {
  await kcAdminClient.auth({
    username: 'admin',
    password: 'password',
    grantType: 'password',
    clientId: 'admin-cli',
  });

  const currentRealms = await kcAdminClient.realms.find();
  const realmExist = currentRealms.filter( object => object.realm === process.env.REALMID ).length
  if(realmExist === 0) {
    const newRealm = await kcAdminClient.realms.create({
      id: process.env.REALMID,
      realm: process.env.REALMNAME,
    });
  }
}

checkRealmRegister();
