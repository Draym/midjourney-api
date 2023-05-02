import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("logs", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        scope: {
            allowNull: false,
            type: DataTypes.STRING
        },
        event: {
            allowNull: false,
            type: DataTypes.STRING
        },
        message: {
            allowNull: true,
            type: DataTypes.STRING
        },
        code: {
            allowNull: true,
            type: DataTypes.STRING
        },
        created_by: {
            allowNull: false,
            type: DataTypes.STRING
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("logs")
}
