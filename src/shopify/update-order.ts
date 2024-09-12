import "@twilio-labs/serverless-runtime-types";
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { Environment } from "../types/context";
import { Helpers } from "../helpers";

type ShopifyEvent = {
  orderId: number;
  action: string;
  request: { cookies: {}; headers: {} };
};

export const handler: ServerlessFunctionSignature = async function (
  context: Context<Environment>,
  event: ShopifyEvent,
  callback: ServerlessCallback
) {
  const { shopify, twilio } = new Helpers(context);
  const { orderId, action } = event;
  const response = twilio.defaultResponse();

  try {
    let result = null;

    switch (action.toLowerCase()) {
      case "SHIP".toLowerCase():
        result = await shopify.shipOrder(orderId);
        break;
      case "DELIVER".toLowerCase():
        result = await shopify.deliverOrder(orderId);
        break;
      case "RETURN".toLowerCase():
        result = await shopify.returnOrder(orderId);
        break;
      case "COLLECT_RETURN".toLowerCase():
        result = await shopify.collectReturn(orderId);
        break;
      case "REFUND".toLowerCase():
        result = await shopify.refundOrder(orderId);
        break;
      default:
        throw Error(
          "Invalid action: choose SHIP, DELIVER, RETURN, COLLECT_RETURN, REFUND"
        );
    }
    response.setBody(result);
    callback(null, response);
  } catch (error) {}
};
