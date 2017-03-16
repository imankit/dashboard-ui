/**
 * Created by Darkstar on 12/5/2016.
 */
export default function (state = { isLogggedIn:false, user:{}, notifications:[] }, action) {
    switch (action.type) {
        case  'LOGOUT':{
            return { isLogggedIn:false, user:{} }
        }
        case  'FETCH_USER':{
            return Object.assign({},{ isLogggedIn:true },action.payload)
        }
        case  'FETCH_NOTIFICATIONS':{
            state.notifications = action.payload
            return Object.assign({},state)
        }

        default:
            return state;
    }
}
