import { Environment } from "../types/context";
import { Sequelize } from "sequelize";
import { initModels } from "nodejento";

global.fetch = fetch;

export class MagentoClient {
  sequelize: Sequelize;
  magentoModels: initModels;

  constructor(context: Environment) {
    this.sequelize = new Sequelize(
      context.MAGENTO_DATABASE,
      context.MAGENTO_USERNAME,
      context.MAGENTO_PASSWORD,
      {
        host: context.MAGENTO_HOSTNAME,
        dialect: "mysql",
        logging: console.log,
      }
    );
    this.magentoModels = initModels(this.sequelize);
  }

  async fetchProductsBySku(sku: string) {
    try {
      return await this.magentoModels.CatalogProductEntity.findOne({
        where: { sku: sku },
      });
    } catch (error) {
      console.log(error.message || "Error fetching Magento products");
    }
  }
}
