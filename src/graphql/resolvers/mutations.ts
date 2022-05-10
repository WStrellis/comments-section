import type { User, AddUserResponse } from "../../types/index"

export default {
    addUser: (
        _: any,
        { name }: { name: string },
        ctx: any,
    ): AddUserResponse => {
        // const newUser: User = { id: ctx.db.users.length + 1, name }
        // ctx.db.users.push(newUser)
        // return {
        //     success: true,
        //     message: "new user created",
        //     user: newUser,
        // }
    },
}
