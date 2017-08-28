// import {
//     SAVE_USERINFO,
//     GET_USERINFO,
// } from './mutation-types.js'

// export default {
//     [SAVE_USERINFO] (state, userinfo ) {
//         state.userinfo = userinfo;
//     }

// }

export const SAVE_USERINFO = (state, userinfo) => {
    state.userinfo = userinfo;
}