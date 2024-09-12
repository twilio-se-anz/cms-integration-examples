import "@twilio-labs/serverless-runtime-types";
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { Environment } from "../types/context";
import { Helpers } from "../helpers";

export const handler: ServerlessFunctionSignature = async function (
  context: Context<Environment>,
  event: null,
  callback: ServerlessCallback
) {
  const { shopify, twilio } = new Helpers(context);
  const response = twilio.defaultResponse();
  try {
    const products = await shopify.fetchProducts();
    response.setBody(extractProductData(products));

    callback(null, response);
  } catch (error) {}
};

function extractProductData(products) {
  return products.map((product) => {
    const { title, description, variants } = product;
    const price = variants[0].price.amount;
    const colors = variants.map((variant) => variant.title);
    const stock = variants.reduce(
      (total, variant) => total + (variant.available ? 1 : 0),
      0
    );

    return {
      title,
      price,
      colors,
      stock,
    };
  });
}
