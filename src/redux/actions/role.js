import { SET_ROLE } from "./types"

export const setRole = (payload) => {
    return {
        type: SET_ROLE,
        payload,
    }
}