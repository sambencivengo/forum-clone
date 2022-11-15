"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entitites/Post");
exports.default = {
    dbName: 'full-typescript-project',
    entities: [Post_1.Post],
    debug: !constants_1.__prod__,
    type: 'postgresql',
    allowGlobalContext: true,
};
//# sourceMappingURL=mikro-orm.config.js.map