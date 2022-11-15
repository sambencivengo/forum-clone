"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const Post_1 = require("./entitites/Post");
const main = async () => {
    try {
        const orm = await core_1.MikroORM.init({
            dbName: 'full-typescript-project',
            entities: [Post_1.Post],
            debug: !constants_1.__prod__,
            type: 'postgresql',
            allowGlobalContext: true,
        });
        const ormFork = orm.em.fork();
        const post = ormFork.create(Post_1.Post, {
            title: 'first post',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await orm.em.persistAndFlush(post);
    }
    catch (error) {
        console.log(error);
    }
};
main();
//# sourceMappingURL=index.js.map