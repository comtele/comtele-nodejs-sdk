const { Client } = require("node-rest-client");

module.exports = class AccountService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getAllAccount(callback) {
    var client = new Client();
    var args = {
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get("https://sms.comtele.com.br/api/v2/accounts", args, function(
      data,
      response
    ) {
      callback(data);
    });
  }

  getAccountByUsername(username, callback) {
    var client = new Client();
    var args = {
      parameters: {
        id: username
      },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get("https://sms.comtele.com.br/api/v2/accounts", args, function(
      data,
      response
    ) {
      callback(data);
    });
  }
};
