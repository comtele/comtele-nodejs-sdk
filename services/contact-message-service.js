const { Client } = require("node-rest-client");

module.exports = class ContactMessageService {
    constructor(apiKey) { this.apiKey = apiKey }

    send(sender, content, groupName, callback) {
        var client = new Client();

        var args = {
            data: { sender, content, groupName },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey }
        };

        client.post(
            "https://sms.comtele.com.br/api/v2/sendcontactmessage",
            args,
            function (data, response) { callback(data); }
        );
    }

    schedule(sender, content, groupName, scheduleDate, callback) {
        var client = new Client();
        var args = {
            data: { sender, content, groupName, scheduleDate },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey }
        };

        client.post(
            "https://sms.comtele.com.br/api/v2/schedulecontextmessage",
            args,
            function (data, response) { callback(data); }
        );
    }
}