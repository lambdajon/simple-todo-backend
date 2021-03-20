"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const router = express_1.Router();
const port = process.env.PORT || 4000;
const swaggerDocs = swagger_jsdoc_1.default({
    swaggerDefinition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:{port}',
                description: 'Todo local server',
                variables: {
                    port: {
                        enum: [port],
                        default: port,
                    },
                },
            },
        ],
        info: {
            version: '1',
            title: 'Todo REST API',
            description: 'Todo API Information',
        },
        components: {
            securitySchemes: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    description: 'Please use login api to get accessToken',
                },
            },
        },
    },
    apis: [
        `${__dirname}/components/*.yaml`,
        `${__dirname}/docs/**/components.yaml`,
        `${__dirname}/docs/**/*.yaml`,
    ],
});
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
exports.default = router;
