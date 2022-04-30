import type { Query, QueryUsersResponse} from '../../../types'

export default {
    users: (parent: any, _:any, ctx:any): QueryUsersResponse  => {
        return {
            success: true,
            message: "ok",
            users: [...ctx.db.users],
        }
    },
}
