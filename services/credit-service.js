const { Client } = require("node-rest-client");

module.exports = class CreditService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getMyCredits(callback) {
    var client = new Client();
    var args = {
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get("https://sms.comtele.com.br/api/v2/credits", args, function(
      data,
      response
    ) {
      callback(data);
    });
  }

  getCredits(username, callback) {
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

    client.get("https://sms.comtele.com.br/api/v2/credits", args, function(
      data,
      response
    ) {
      callback(data);
    });
  }

  addCredits(username, amount, callback) {
    var client = new Client();
    var args = {
      parameters: {
        id: username,
        amount
      },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.put("https://sms.comtele.com.br/api/v2/credits", args, function(
      data,
      response
    ) {
      callback(data);
    });
  }

  getHistory(username, callback) {
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

    client.get(
      "https://sms.comtele.com.br/api/v2/balancehistory",
      args,
      function(data, response) {
        callback(data);
      }
    );
  }
};
