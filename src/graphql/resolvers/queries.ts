export default {
    users: (parent: any, _, ctx) => {
        return {
            code: 200,
            success: true,
            message: "ok",
            users: [...ctx.db.users],
        }
    },
}
