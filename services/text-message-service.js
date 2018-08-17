const { Client } = require("node-rest-client");

module.exports = class TextMessageService {
  constructor(apiKey) {
    this.apiKey = apiKey;

    this.DeliveryStatus = {
      ALL: 0,
      DELIVERED: 1,
      UNDELIVERED: 2
    };

    this.ReportGroup = {
      MONTHLY: 0,
      DAILY: 1
    };
  }

  send(sender, content, receivers, callback) {
    var client = new Client();
    var args = {
      data: {
        sender,
        content,
        receivers: receivers.join()
      },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.post("https://sms.comtele.com.br/api/v2/send", args, function (
      data,
      response
    ) {
      callback(data);
    });
  }

  schedule(sender, content, scheduleDate, receivers, callback) {
    var client = new Client();
    var args = {
      data: {
        sender,
        content,
        scheduleDate,
        receivers: receivers.join()
      },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.post("https://sms.comtele.com.br/api/v2/schedule", args, function (
      data,
      response
    ) {
      callback(data);
    });
  }

  getDetailedReport(startDate, endDate, deliveryStatus, callback) {
    let deliveryStatusAsString = this.deliveryStatusToString(deliveryStatus);
    let client = new Client();

    let args = {
      parameters: { startDate, endDate, delivered: deliveryStatusAsString },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get(
      "https://sms.comtele.com.br/api/v2/detailedreporting",
      args,
      function (data, response) {
        callback(data);
      }
    );
  }

  getConsolidatedReport(startDate, endDate, groupType, callback) {
    let reportGroupAsString = this.reportGroupToString(groupType);
    let client = new Client();

    let args = {
      parameters: { startDate, endDate, group: reportGroupAsString },
      headers: {
        "Content-Type": "application/json",
        "auth-key": this.apiKey
      }
    };

    client.get(
      "https://sms.comtele.com.br/api/v2/consolidatedreporting",
      args,
      function (data, response) {
        callback(data);
      }
    );
  }

  deliveryStatusToString(deliveryStatus) {
    let deliveryStatusAsString = "all";

    switch (deliveryStatus) {
      case this.DeliveryStatus.ALL:
        deliveryStatusAsString = "all";
        break;
      case this.DeliveryStatus.DELIVERED:
        deliveryStatusAsString = "true";
        break;
      case this.DeliveryStatus.UNDELIVERED:
        deliveryStatusAsString = "false";
        break;
    }

    return deliveryStatusAsString;
  }

  reportGroupToString(reportGroup) {
    let reportGroupAsString = "true";

    switch (reportGroup) {
      case this.ReportGroup.DAILY:
        reportGroupAsString = "false";
        break;
      case this.ReportGroup.MONTHLY:
        reportGroupAsString = "true";
        break;
    }

    return reportGroupAsString;
  }
};
