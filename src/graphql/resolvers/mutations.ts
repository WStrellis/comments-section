import type {Resolvers} from '../../../types'

export default {
    addUser: (
        _: any,
        { name }: { name: string },
        ctx: any,
    ): CS.AddUserResponse => {
        const newUser : CS.User = { id: ctx.db.users.length + 1, name }
        ctx.db.users.push(newUser)
        return {
            code: 200,
            success: true,
            message: "new user created",
            user: newUser,
        }
    },
}
