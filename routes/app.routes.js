module.exports = function(app) {
  const cont = require('../controllers/sql.controller');
  const comments = require('../controllers/comments.controller');
  const sessions = require('../controllers/sessions.controller');
  const coll = require('../controllers/collections.controller');
  const storage = require('../controllers/storage.controller');
  const users = require('../controllers/users.controller');
  const clients = require('../controllers/clients.controller');

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

  // Client dashboard route
  app.route('/api/client/:workspace/:task/:clientId')
    .get(clients.list_all);

  // Clients
  app.route('/api/admin/clients')
    .get(sessions.list_all_clients);

  // Services
  app.route('/api/admin/clientservices/:clientId')
    .get(sessions.list_all_by_clientId);

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

/*
  // Users
  app.route('/api/:type/admin/users')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/:type/admin/users/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Sessions
  app.route('/api/:type/admin/sessions')
    .post(sessions.auth_user);
    //.post(sessions.auth);

  app.route('/api/:type/admin/sessions/:email')
    .get(sessions.authCheck)
    //.put(sessions.update_item)
    .delete(sessions.delete_item);

  // Services
  app.route('/api/:type/admin/clientservices')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/:type/admin/clientservices/:f_id')
    .get(cont.f_read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Applications & Collections
  app.route('/api/:type/:workspace/:clientId')
    .get(cont.list_all_by_clientId);

  app.route('/api/:type/:workspace/:workrecord/:id')
    .get(cont.read_item)
    .put(cont.update_item)

  // Clients
  app.route('/api/admin/clients')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/admin/clients/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Blogs
  app.route('/api/community/blogs')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/community/blogs/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Comments
  app.route('/api/community/comments')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/community/comments/:id')
    .get(comments.read_item)
    .put(comments.update_item)
    .delete(cont.delete_item);

  // Applications
  app.route('/api/:type/:workspace/:id')
    .get(cont.list_all)
    .post(cont.create_item)
    .post(cont.create_items);

  app.route('/api/workspace/applications/application/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  app.route('/api/workspace/:workspace/:clientId')
    .get(cont.list_all_by_clientId)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Cases
  app.route('/api/workspace/cases')
    .get(cont.list_all)
    .post(cont.create_item)
    .post(cont.create_items);

  app.route('/api/workspace/cases/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Outcomes
  app.route('/api/workspace/outcomes')
    .get(cont.list_all)
    .post(cont.create_item)
    .post(cont.create_items);

  app.route('/api/workspace/outcomes/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Collections
  app.route('/api/workspace/collections')
    .get(coll.list_all)
    .post(coll.create_item);

  app.route('/api/workspace/collections/collection/:id')
    //.get(coll.f_read_item)
    .get(coll.read_item)
    .put(coll.update_item)
    .delete(coll.delete_item);

  // Approved
  app.route('/api/workspace/applications/approved')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/workspace/applications/approved/:applicationId')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Vetting
  app.route('/api/maintenance/scorecards')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/maintenance/scorecards/:scorecardId')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Policies
  app.route('/api/maintenance/declines')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/maintenance/declines/:declineId')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);
*/
  // Uploads
  app.route('/api/:type/:workspace/upload/document')
    .post(storage.single_upload);

  // Downloads
  app.route('/api/:type/:workspace/download/document/:id')
    .post(storage.single_download);

}
