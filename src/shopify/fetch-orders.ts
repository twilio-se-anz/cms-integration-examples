import "@twilio-labs/serverless-runtime-types";
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { Environment } from "../types/context";
import { Helpers } from "../helpers";

type ShopifyEvent = {
  email?: string;
  request: { cookies: {}; headers: {} };
};

export const handler: ServerlessFunctionSignature = async function (
  context: Context<Environment>,
  event: ShopifyEvent,
  callback: ServerlessCallback
) {
  const { shopify, twilio } = new Helpers(context);
  const { email } = event;
  const response = twilio.defaultResponse();

  try {
    let orders = await shopify.fetchOrders(JSON.stringify(email));
    orders = await Promise.all(
      orders.map(async (o) => await shopify.addOrderFlexStatus(o))
    );

    response.setBody(await shopify.normalizeOrders(orders));

    callback(null, response);
  } catch (error) {}
};
