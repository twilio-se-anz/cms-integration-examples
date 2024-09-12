import "@twilio-labs/serverless-runtime-types";
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { Environment } from "../types/context";
import { Helpers } from "../helpers";

type MagentoEvent = {
  sku?: string;
  request: { cookies: {}; headers: {} };
};

export const handler: ServerlessFunctionSignature = async function (
  context: Context<Environment>,
  event: MagentoEvent,
  callback: ServerlessCallback
) {
  const { magento, twilio } = new Helpers(context);
  const response = twilio.defaultResponse();
  try {
    const products = await magento.fetchProductsBySku(event.sku);
    response.setBody(products);

    callback(null, response);
  } catch (error) {}
};
