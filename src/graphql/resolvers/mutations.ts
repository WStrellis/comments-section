import type { User, AddUserResponse } from "../../types/index"
import { type InsertOneResult, ObjectId } from "mongodb"
import { getErrorMessage } from "../../util/errors"

export default {
    addUser: async (
        _: any,
        { name }: { name: string },
        ctx: any,
    ): Promise<AddUserResponse> => {
        // add user
        const res: AddUserResponse = {
            success: true,
            message: "",
            user: undefined,
        }
        try {
            const dbRes: InsertOneResult =
                await ctx.dataSources.usersClx.addUser(name)

            res.success = dbRes.acknowledged

            if (dbRes.acknowledged) {

                res.user = {
                    _id: dbRes.insertedId.toString(),
                    name,
                }
                res.message = "Created user " + name

            } else {
                throw new Error(
                    `Could not create user: ${JSON.stringify(dbRes)}`,
                )
            }
        } catch (error) {
            res.message = getErrorMessage(error)
            res.success = false
        }
        return res
    },
}
