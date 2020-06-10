module.exports = function(app) {
  const cont = require('../controllers/sql.controller');

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

  app.use(function(req, res, next) {
    //console.log('req: ', req);
    req.table = getTableName(req.path);
    next();
  });

  app.route('/api/users')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/users/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);

  app.route('/api/clients')
    .get(cont.list_all)
    .post(cont.create_item);

  app.route('/api/clients/:id')
    .get(cont.read_item)
    .put(cont.update_item)
    .delete(cont.delete_item);
}
