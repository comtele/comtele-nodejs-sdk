const { Client } = require("node-rest-client");

module.exports = class TokenService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    sendToken(phoneNumber, callback) {
        return this.sendToken(phoneNumber, "", callback);
    }

    sendToken(phoneNumber, prefix, callback) {
        var client = new Client();
        var args = {
            data: { phoneNumber, prefix },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.post("https://sms.comtele.com.br/api/v2/tokenmanager", args, function (data) {
            callback(data);
        });
    }

    validateToken(tokenCode, callback) {
        var client = new Client();
        var args = {
            data: { tokenCode },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.put("https://sms.comtele.com.br/api/v2/tokenmanager", args, function (data) {
            callback(data);
        });
    }
};
