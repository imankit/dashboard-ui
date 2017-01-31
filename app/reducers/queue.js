
export default function (state = {allQueues:[],selectedQueue:{},selectedQueueItems:[],loaded:false}, action) {
    switch (action.type) {
        case 'FETCH_QUEUE': {
            state.allQueues = [].concat(action.payload)
            state.loaded = true           
            return Object.assign({},state)
        }
        case 'SELECT_QUEUE': {
            if(action.payload.items) state.selectedQueueItems = [].concat(action.payload.items)
                else state.selectedQueueItems = []
            state.selectedQueue = action.payload.selectedQueue
            return Object.assign({},state)
        }
        case 'RESET': {
            return { allQueues:[],selectedQueue:{},selectedQueueItems:[],loaded:false}
        }

        default:
            return state;
    }
}
