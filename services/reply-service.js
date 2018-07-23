const { Client } = require("node-rest-client");

module.exports = class ReplyService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getReport(startDate, endDate, sender, callback) {
    let client = new Client();

    let args = {
      parameters: { startDate, endDate, sender },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get(
      "https://sms.comtele.com.br/api/v2/replyreporting",
      args,
      function(data, response) {
        callback(data);
      }
    );
  }
};
