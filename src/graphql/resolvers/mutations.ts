export default {
    addUser: (_, { name }, ctx) => {
        const newUser = { id: ctx.db.users.length + 1, name }
        ctx.db.users.push(newUser)
        return {
            code: 200,
            success: true,
            message: "new user created",
            user: newUser,
        }
    },
}
