module.exports = function(app) {
  const cont = require('../controllers/sql.controller');
  const comments = require('../controllers/comments.controller');

  function getTableName(path) {
    const searchTerm = '/';
    const indexOfFirst = path.indexOf(searchTerm);
    const indexOfSecond = path.indexOf(searchTerm, (indexOfFirst + 1));
    const indexOfThird = path.indexOf(searchTerm, (indexOfSecond + 1));

    // For routes with /api/{table}/:id pattern
    if (indexOfThird > 0) return path.substring(indexOfSecond + 1, indexOfThird);
    // For routes with /api/{table} pattern
    return path.substring(indexOfSecond + 1);
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
  app.route('/api/blogs')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/blogs/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  // Comments
  app.route('/api/comments')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/comments/:id')
    .get(comments.read_item)
    .put(comments.update_item)
    .delete(cont.delete_item);
}
