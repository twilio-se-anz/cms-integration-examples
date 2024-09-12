"use strict";
const functions = Runtime.getFunctions(); //eslint-disable-line no-undef
import { TwilioHelper } from "./twilio.private";
import { ShopifyClient } from "./shopify.private";
import { MagentoClient } from "./magento.private";

export class Helpers {
  twilio: TwilioHelper;
  shopify: ShopifyClient;
  magento: MagentoClient;

  constructor(context) {
    /*
     * Load Twilio Helper Methods
     */
    const twilioPath = functions["helpers/twilio"].path;
    const twilioLib = require(twilioPath).TwilioHelper;
    this.twilio = new twilioLib();

    /*
     * Load Shopify Helper Methods
     */
    const shopifyPath = functions["helpers/shopify"].path;
    const shopifyClient = require(shopifyPath).ShopifyClient;
    this.shopify = new shopifyClient(context);

    /*
     * Load Magento Helper Methods
     */
    const magentoPath = functions["helpers/magento"].path;
    const magentoClient = require(magentoPath).MagentoClient;
    this.magento = new magentoClient(context);
  }
}
