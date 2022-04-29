export default {
    users: (parent: any, _:any, ctx:any)  => {
        return {
            code: 200,
            success: true,
            message: "ok",
            users: [...ctx.db.users],
        }
    },
}
