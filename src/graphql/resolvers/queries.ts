import type { QueryUsersResponse} from '../../types/index'

export default {
    users: (parent: any, _:any, ctx:any): QueryUsersResponse  => {
        return {
            success: true,
            message: "ok",
            users: [...ctx.db.users],
        }
    },
}
