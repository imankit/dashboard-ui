/**
 * Created by Darkstar on 12/5/2016.
 */
export default function (state = { isLogggedIn:true, user:{} }, action) {
    switch (action.type) {
        case  'LOGOUT':{
            return { isLogggedIn:false, user:{} }
        }
        case  'FETCH_USER':{
            return Object.assign({},{ isLogggedIn:true },action.payload)
        }

        default:
            return state;
    }
}
