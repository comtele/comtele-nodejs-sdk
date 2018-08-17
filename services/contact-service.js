const { Client } = require("node-rest-client");

module.exports = class ContactService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    createGroup(groupName, groupDescription, callback) {
        var client = new Client();
        var args = {
            data: { name: groupName, description: groupDescription },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.post("https://sms.comtele.com.br/api/v2/contactgroup", args, function (data) {
            callback(data);
        });
    }

    removeGroup(groupName, callback) {
        var client = new Client();
        var args = {
            parameters: { id: groupName },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.delete($`https://sms.comtele.com.br/api/v2/contactgroup`, args, function (data) {
            callback(data);
        });
    }

    getAllGroups(callback) {
        var client = new Client();
        var args = {
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.get($`https://sms.comtele.com.br/api/v2/contactgroup`, args, function (data) {
            callback(data);
        });
    }

    getGroupByName(groupName, callback) {
        var client = new Client();
        var args = {
            parameters: { id: groupName },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.get($`https://sms.comtele.com.br/api/v2/contactgroup`, args, function (data) {
            callback(data);
        });
    }

    addContactToGroup(groupName, contactPhone, contactName, callback) {
        var client = new Client();
        var args = {
            data: { groupName, contactPhone, contactName, action: "add_number" },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.put("https://sms.comtele.com.br/api/v2/contactgroup", args, function (data) {
            callback(data);
        });
    }

    removeContactFromGroup(groupName, contactPhone, callback) {
        var client = new Client();
        var args = {
            data: { groupName, contactPhone, action: "remove_number" },
            headers: { "Content-Type": "application/json", "auth-key": this.apiKey },
        }

        client.put("https://sms.comtele.com.br/api/v2/contactgroup", args, function (data) {
            callback(data);
        });
    }
}