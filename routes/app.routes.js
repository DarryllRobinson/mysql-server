module.exports = function(app) {
  const cont = require('../controllers/sql.controller');
  const comments = require('../controllers/comments.controller');

  function getTableName(path) {
    const searchTerm = '/';
    const indexOfFirst = path.indexOf(searchTerm);
    const indexOfSecond = path.indexOf(searchTerm, (indexOfFirst + 1));
    const indexOfThird = path.indexOf(searchTerm, (indexOfSecond + 1));
    const indexOfFourth = path.indexOf(searchTerm, (indexOfThird + 1));
    const apiLength = path.length;

    // For routes with /api/{resource}/{table}/:id pattern
    if (indexOfFourth < 0) return path.substring(indexOfThird + 1, apiLength);
    // For routes with /api/{table}/:id pattern
    if (indexOfThird < 0) return path.substring(indexOfSecond + 1, indexOfThird);
    // For routes with /api/{table} pattern
    if (indexOfSecond < 0) return path.substring(indexOfFirst, indexOfSecond + 1);
  }

  // Adding table name to the req
  app.use(function(req, res, next) {
    req.table = getTableName(req.path);
    next();
  });

  // Users
  app.route('/api/users')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/users/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Clients
  app.route('/api/clients')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/clients/:id')
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
  app.route('/api/workspace/applications')
    .get(cont.list_all)
    .post(cont.create_item)
    .post(cont.create_items);

  app.route('/api/workspace/applications/:applicationId')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

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
}
