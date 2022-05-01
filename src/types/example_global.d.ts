/*
declare global {
    declare namespace CS {
        interface APIResponse {
            code: number
            success: boolean
            message: string
        }

        interface User {
            id: number
            name: string
        }

        interface AddUserResponse extends APIResponse {
            user: User
        }
    }

}
export {}
*/

/* alternative:
export = { CS }
useage:
 import type { CS } from "../../types/app_types"
*/
