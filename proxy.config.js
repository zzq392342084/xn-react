module.exports = {
  'POST /api/login': function (req, res) {
    setTimeout(function () {
      res.json({
        "sessionToken": "098f6bcd4621d373cade4e832627b4f6",
        "username": "administrator",
        "role": "admin"
      });
    }, 1500);
  },

  'GET /api/self': function (req, res) {
    setTimeout(function () {
      res.json({
        "sessionToken": "098f6bcd4621d373cade4e832627b4f6",
        "username": "administrator",
        "role": "admin"
      });
    }, 1000);
  },

  'GET /api/accounts': function (req, res) {
    setTimeout(function () {
      res.json([{
        "accountId": 1,
        "mobileNumber": 15022222222,
        "realName": "guox",
        "role": "basic",
        "address": "测试",
        "createdAt": "2015-09-21"
      }]);
    }, 1000);
  },
  'POST /api/accounts': function (req, res) {
    res.status(201).json({
      "accountId": 1,
      "mobileNumber": 15022222222,
      "realName": "guox",
      "role": "basic",
      "address": "测试",
      "createdAt": "2015-09-21"
    });
  }
};
