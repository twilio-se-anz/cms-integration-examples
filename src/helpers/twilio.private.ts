export class TwilioHelper {
  defaultResponse() {
    const response = this._defaultResponse();
    return response;
  }

  badRequestResponse(message) {
    const response = this._defaultResponse();
    response.setStatusCode(401);
    response.setBody(message);
    return response;
  }

  internalServerError(message) {
    const response = this._defaultResponse();
    response.setStatusCode(500);
    response.setBody({ error: message });
    return response;
  }

  forbiddenResponse() {
    const response = this._defaultResponse();
    response.setStatusCode(403);
    return response;
  }

  _defaultResponse() {
    const response = new Twilio.Response(); //eslint-disable-line no-undef
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");
    return response;
  }

  handleError(message: string, error: any) {
    console.error(message, error.message);
    throw new Error(`${message}: ${error.message}`);
  }

  sanitizeNumber(phone: string) {
    let phoneCleaned = phone.replace("whatsapp:", "");
    const [region, number] = [phoneCleaned.slice(0, 5), phoneCleaned.slice(5)];

    //normalize wpp BR number
    if (region.startsWith("+55") && phoneCleaned.length === 13) {
      phoneCleaned = `${region}9${number}`;
    }

    return phoneCleaned;
  }

  createClient(context) {
    return context.getTwilioClient();
  }
}
