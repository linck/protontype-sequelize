"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeModelConfig_1 = require("./SequelizeModelConfig");
const Sequelize = __importStar(require("sequelize"));
/**
 * @author Humberto Machado
 */
class SequelizeBaseModel {
    getModelName() {
        return this.name;
    }
    defineModel(sequelize) {
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    }
    configure() {
        //Hook Method
    }
    configureAssociations() {
        if (this.associations) {
            this.associations.forEach(assoc => {
                switch (assoc.type) {
                    case SequelizeModelConfig_1.AssociationType.HAS_MANY:
                        this.hasMany(assoc.modelName, assoc.options);
                        break;
                    case SequelizeModelConfig_1.AssociationType.BELONGS_TO:
                        this.belongsTo(assoc.modelName, assoc.options);
                        break;
                    case SequelizeModelConfig_1.AssociationType.HAS_ONE:
                        this.hasOne(assoc.modelName, assoc.options);
                        break;
                    case SequelizeModelConfig_1.AssociationType.BELONGS_TO_MANY:
                        this.belongsToMany(assoc.modelName, assoc.options);
                        break;
                }
            });
        }
    }
    belongsTo(modelName, options) {
        this.model.belongsTo(this.dbConnector.getModel(modelName).getInstance(), options);
    }
    hasMany(modelName, options) {
        this.model.hasMany(this.dbConnector.getModel(modelName).getInstance(), options);
    }
    hasOne(modelName, options) {
        this.model.hasOne(this.dbConnector.getModel(modelName).getInstance(), options);
    }
    belongsToMany(modelName, options) {
        this.model.belongsToMany(this.dbConnector.getModel(modelName).getInstance(), options);
    }
    getInstance() {
        return this.model;
    }
    setProtonDB(ProtonDB) {
        this.dbConnector = ProtonDB;
    }
}
exports.SequelizeBaseModel = SequelizeBaseModel;
exports.DataTypes = Sequelize;
//# sourceMappingURL=SequelizeBaseModel.js.map