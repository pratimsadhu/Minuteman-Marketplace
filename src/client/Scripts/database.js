import pouchDb from 'pouchdb';

const goodsDB = new pouchDb('goods');
const servicesDB = new pouchDb('services');
const usersDB = new pouchDb('users');

export { goodsDB, servicesDB, usersDB };

