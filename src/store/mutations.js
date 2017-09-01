import {
    SAVE_USERINFO,
    GET_USERINFO,
    LOGIN_STATE
} from './mutation-types.js'

export default {
    [SAVE_USERINFO] (state, userInfo ) {
        state.userInfo = userInfo;
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    [GET_USERINFO] (state) {

    },
    [LOGIN_STATE] (state, loginState) {
        state.loginState = loginState;
        localStorage.setItem("loginState", loginState)
    },

}
