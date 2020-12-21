module.exports = function(app) {
  const cont = require('../controllers/sql.controller');
  const comments = require('../controllers/comments.controller');
  const sessions = require('../controllers/sessions.controller');
  const coll = require('../controllers/collections.controller');
  const storage = require('../controllers/storage.controller');
  const users = require('../controllers/users.controller');
  const clients = require('../controllers/clients.controller');
  const email = require('../controllers/email.controller');
  const sales = require('../controllers/salesforce.controller');
  const reports = require('../controllers/report.controller');

  function getTableName(path) {
    const searchTerm = '/';
    const indexOfFirst = path.indexOf(searchTerm);
    const indexOfSecond = path.indexOf(searchTerm, (indexOfFirst + 1));
    const indexOfThird = path.indexOf(searchTerm, (indexOfSecond + 1));
    const indexOfFourth = path.indexOf(searchTerm, (indexOfThird + 1));
    const indexOfFifth = path.indexOf(searchTerm, (indexOfFourth + 1));
    const indexOfSixth = path.indexOf(searchTerm, (indexOfFifth + 1));
    const apiLength = path.length;

    /*console.log('indexOfFirst: ', indexOfFirst);
    console.log('indexOfSecond: ', indexOfSecond);
    console.log('indexOfThird: ', indexOfThird);
    console.log('indexOfFourth: ', indexOfFourth);
    console.log('indexOfFifth: ', indexOfFifth);
    console.log('indexOfSixth: ', indexOfSixth);
    console.log('apiLength: ', apiLength);*/

    // For routes with /api/{resource}/{workspace}/{table}/:id pattern
    //if (indexOfSixth < 0) console.log('6: ', path.substring(indexOfFourth + 1, indexOfFifth) + 's');
    if (indexOfSixth < 0) return path.substring(indexOfFourth + 1, indexOfFifth) + 's';
    // For routes with /api/{resource}/{table}/{appstatus}/:id pattern
    //if (indexOfFifth < 0) console.log('5: ', path.substring(indexOfThird + 1, indexOfFourth));
    if (indexOfFifth < 0) return path.substring(indexOfThird + 1, indexOfFourth);
    // For routes with /api/{resource}/{table}/:id pattern
    //if (indexOfFourth < 0) console.log('4: ', path.substring(indexOfThird + 1, apiLength));
    if (indexOfFourth < 0) return path.substring(indexOfThird + 1, apiLength);
    // For routes with /api/{table}/:id pattern
    //if (indexOfThird < 0) console.log('3: ', path.substring(indexOfSecond + 1, apiLength));
    if (indexOfThird < 0) return path.substring(indexOfSecond + 1, apiLength);
    // For routes with /api/{table} pattern
    //if (indexOfSecond < 0) console.log('2: ', path.substring(indexOfFirst, indexOfSecond + 1));
    if (indexOfSecond < 0) return path.substring(indexOfFirst, apiLength);
  }

  function getTypeName(path) {
    const searchTerm = '/';
    const indexOfFirst = path.indexOf(searchTerm);
    const indexOfSecond = path.indexOf(searchTerm, (indexOfFirst + 1));
    const indexOfThird = path.indexOf(searchTerm, (indexOfSecond + 1));
    const indexOfFourth = path.indexOf(searchTerm, (indexOfThird + 1));
    const indexOfFifth = path.indexOf(searchTerm, (indexOfFourth + 1));
    const indexOfSixth = path.indexOf(searchTerm, (indexOfFifth + 1));
    const apiLength = path.length;

    /*console.log('indexOfFirst: ', indexOfFirst);
    console.log('indexOfSecond: ', indexOfSecond);
    console.log('indexOfThird: ', indexOfThird);
    console.log('indexOfFourth: ', indexOfFourth);
    console.log('indexOfFifth: ', indexOfFifth);
    console.log('indexOfSixth: ', indexOfSixth);
    console.log('apiLength: ', apiLength);*/

    // For routes with /api/{type}/{workspace}/{table}/:id pattern
    //if (indexOfSixth < 0) console.log('6: ', path.substring(indexOfFourth + 1, indexOfFifth) + 's');
    if (indexOfSixth < 0) return path.substring(indexOfFourth + 1, indexOfFifth) + 's';
    // For routes with /api/{type}/{table}/{appstatus}/:id pattern
    //if (indexOfFifth < 0) console.log('5: ', path.substring(indexOfThird + 1, indexOfFourth));
    if (indexOfFifth < 0) return path.substring(indexOfThird + 1, indexOfFourth);
    // For routes with /api/{resource}/{table}/:id pattern
    //if (indexOfFourth < 0) console.log('4: ', path.substring(indexOfThird + 1, apiLength));
    if (indexOfFourth < 0) return path.substring(indexOfThird + 1, apiLength);
    // For routes with /api/{table}/:id pattern
    //if (indexOfThird < 0) console.log('3: ', path.substring(indexOfSecond + 1, apiLength));
    if (indexOfThird < 0) return path.substring(indexOfSecond + 1, apiLength);
    // For routes with /api/{table} pattern
    //if (indexOfSecond < 0) console.log('2: ', path.substring(indexOfFirst, indexOfSecond + 1));
    if (indexOfSecond < 0) return path.substring(indexOfFirst, apiLength);
  }

  // Adding table name to the req
  app.use(function(req, res, next) {
    req.type = getTypeName(req.path);
    req.table = getTableName(req.path);
    /*console.log('req.type: ', req.type);
    console.log('req.table: ', req.table);
    console.log('req.params: ', req.params);
    console.log('req.body: ', req.body);*/
    next();
  });

  // cws_admin routes
  // Users
  app.route('/api/admin/sessions')
    .post(sessions.auth_user);

  app.route('/api/admin/user')
    .post(sessions.create_user);

  app.route('/api/admin/user/reset')
    .post(users.reset_password);

  app.route('/api/admin/user/change')
    .post(users.change_password);

  app.route('/api/admin/user/:userId')
    .post(users.update_user)
    .delete(users.delete_user);

  app.route('/api/admin/users')
    .get(users.list_all_users);

  app.route('/api/admin/users/deactivate/:userId')
    .put(users.deactivate_user);

  app.route('/api/admin/users/reactivate/:userId')
    .put(users.reactivate_user);

  // Client dashboard route
  app.route('/api/client/:workspace/:task/:clientId')
    .get(clients.list_all);

  // Clients
  app.route('/api/admin/clients')
    .get(sessions.list_all_clients)
    .post(clients.create_client);

  app.route('/api/admin/clients/:clientId')
    .delete(clients.delete_client);

  app.route('/api/admin/clients/deactivate/:clientId')
    .put(clients.deactivate_client);

  app.route('/api/admin/clients/reactivate/:clientId')
    .put(clients.reactivate_client);

  // Services
  app.route('/api/admin/clientservices/:clientId')
    .get(sessions.list_all_by_clientId);

  app.route('/api/admin/clientservices')
    .post(clients.create_clientservices);

  // Resolutions etc.
  app.route('/api/admin/:workspace/:task')
    .get(sessions.list_all);

  // cws_business and cws_consumer routes
  app.route('/api/:type/:workspace/:task/:clientId')
    .get(cont.list_all)
    .post(cont.create_item)
    .post(cont.create_items);

  app.route('/api/:type/:workspace/:task/:clientId/workzone/:user')
    .get(cont.list_today);

  app.route('/api/:type/:workspace/:task/:clientId/:recordId')
    .get(cont.read_item)
    .put(cont.update_item);
    /*.delete(cont.delete_item);*/

  // email route
  app.route('/api/admin/email')
    .post(email.send_email);

  app.route('/api/admin/error_email')
    .post(email.send_error_email);

  // reports
  app.route('/api/reports/')
    .post(reports.extract_report);

  // Salesforce callback
  app.route('/api/salesforce')
    .post(sales.receive_token);

  // Uploads
  app.route('/api/:type/:workspace/upload/document')
    .post(storage.single_upload);

  // Downloads
  app.route('/api/:type/:workspace/download/document/:id')
    .post(storage.single_download);

}
