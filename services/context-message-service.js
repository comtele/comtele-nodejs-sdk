const { Client } = require("node-rest-client");

module.exports = class ContextMessageService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    send(sender, contextRuleName, receivers, callback) {
        var client = new Client();
        var args = {
            data: {
                sender,
                contextRuleName,
                receivers: receivers.join()
            },
            headers: {
                "Content-Type": "application/json",
                "auth-key": this.apiKey
            }
        };

        client.post(
            "https://sms.comtele.com.br/api/v2/sendcontextmessage",
            args,
            function (data, response) {
                callback(data);
            }
        );
    }

    schedule(sender, contextRuleName, scheduleDate, receivers, callback) {
        var client = new Client();
        var args = {
            data: {
                sender,
                scheduleDate,
                contextRuleName,
                receivers: receivers.join()
            },
            headers: {
                "Content-Type": "application/json",
                "auth-key": this.apiKey
            }
        };

        client.post(
            "https://sms.comtele.com.br/api/v2/schedulecontextmessage",
            args,
            function (data, response) {
                callback(data);
            }
        );
    }

    getReport(startDate, endDate, sender, contextRuleName, callback) {
        let client = new Client();

        let args = {
            parameters: { startDate, endDate, sender, contextRuleName },
            headers: {
                "Content-Type": "application/json",
                "auth-key": this.apiKey
            }
        };

        client.get(
            "https://sms.comtele.com.br/api/v2/contextreporting",
            args,
            function (data, response) {
                callback(data);
            }
        );
    }
};
