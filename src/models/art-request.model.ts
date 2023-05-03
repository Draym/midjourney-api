import {DataTypes, Model, Optional, Sequelize} from "sequelize"
import {ArtRequest} from "../interfaces"
import {EnlargeType, VariationType} from "@d-lab/discord-puppet"

export type ArtRequestCreationAttributes = Optional<ArtRequest, "id" | "createdAt" | "updatedAt">

export default class ArtRequestModel extends Model<ArtRequest, ArtRequestCreationAttributes> implements ArtRequest {
    public id: number
    public clientId: number
    public requestId: string
    public type: RequestType
    public prompt: string | null
    public promptAction: EnlargeType | VariationType | null
    public actionTargetId: string | null
    public state: number
    public imageUrl: string | null
    public runnerId: number
    public createdAt: Date
    public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof ArtRequestModel => {
    // Init all models
    ArtRequestModel.init({
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            clientId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            requestId: {
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
            promptAction: {
                allowNull: true,
                type: DataTypes.STRING
            },
            actionTargetId: {
                allowNull: true,
                type: DataTypes.STRING
            },
            state: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            imageUrl: {
                allowNull: true,
                type: DataTypes.STRING
            },
            runnerId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            underscored: true,
            modelName: "art_requests",
            sequelize,
            timestamps: true
        })
    return ArtRequestModel
}