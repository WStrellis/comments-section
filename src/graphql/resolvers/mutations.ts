// import type { CommentsSection } from "../../types/app_types"

export default {
    addUser: (
        _: any,
        { name }: { name: string },
        ctx: any,
    ): CS.AddUserResponse => {
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
