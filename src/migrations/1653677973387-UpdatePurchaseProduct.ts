import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePurchaseProduct1653677973387 implements MigrationInterface {
    name = 'UpdatePurchaseProduct1653677973387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`purchase_product\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quantity_product\` int NOT NULL, \`total_price\` int NOT NULL, \`purchase_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`purchase_product\` ADD CONSTRAINT \`FK_2c3ae950b4eaefc4c65747f018e\` FOREIGN KEY (\`purchase_id\`) REFERENCES \`purchase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_product\` ADD CONSTRAINT \`FK_5de05b42aeedcd8565a7f1061e7\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchase_product\` DROP FOREIGN KEY \`FK_5de05b42aeedcd8565a7f1061e7\``);
        await queryRunner.query(`ALTER TABLE \`purchase_product\` DROP FOREIGN KEY \`FK_2c3ae950b4eaefc4c65747f018e\``);
        await queryRunner.query(`DROP TABLE \`purchase_product\``);
    }

}
