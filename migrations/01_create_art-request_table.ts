import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("art_requests", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        client_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        request_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        prompt: {
            allowNull: true,
            type: DataTypes.STRING
        },
        prompt_action: {
            allowNull: true,
            type: DataTypes.STRING
        },
        action_target_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        state: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        image_url: {
            allowNull: true,
            type: DataTypes.STRING
        },
        runner_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("art_requests")
}
