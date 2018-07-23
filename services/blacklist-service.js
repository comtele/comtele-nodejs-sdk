const { Client } = require("node-rest-client");

module.exports = class BlacklistService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getBlacklist(callback) {
    var client = new Client();
    var args = {
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get("https://sms.comtele.com.br/api/v2/blacklist", args, function(
      data
    ) {
      callback(data);
    });
  }

  getByPhoneNumber(phoneNumber, callback) {
    var client = new Client();
    var args = {
      parameters: { id: phoneNumber },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get("https://sms.comtele.com.br/api/v2/blacklist", args, function(
      data
    ) {
      callback(data);
    });
  }

  insert(phoneNumber, callback) {
    var client = new Client();
    var args = {
      data: { phoneNumber },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.post("https://sms.comtele.com.br/api/v2/blacklist", args, function(
      data
    ) {
      callback(data);
    });
  }

  remove(phoneNumber, callback) {
    var client = new Client();
    var args = {
      parameters: { id: phoneNumber },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.delete("https://sms.comtele.com.br/api/v2/blacklist", args, function(
      data
    ) {
      callback(data);
    });
  }
};
