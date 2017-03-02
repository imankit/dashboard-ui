
export default function (state = { loading : true,modal_loading:false }, action) {
    switch (action.type) {
        case 'START_LOADING': {
            return { loading : true }
        }
        case 'START_LOADING_MODAL': {
            return { modal_loading : true }
        }
        case 'STOP_LOADING': {
            return { loading : false }
        }
        case 'STOP_LOADING_MODAL': {
            return { modal_loading : false }
        }
        default:
            return state;
    }
}
