
export default function (state = {allCaches:[],selectedCache:{},selectedCacheItems:[],loaded:false}, action) {
    switch (action.type) {
        case 'FETCH_CACHE': {
            state.allCaches = [].concat(action.payload)
            state.loaded = true           
            return Object.assign({},state)
        }
        case 'SELECT_CACHE': {
            state.selectedCacheItems = [].concat(action.payload.items)
            state.selectedCache = action.payload.selectedCache
            return Object.assign({},state)
        }
        case 'RESET': {
            return { allCaches:[],selectedCache:{},selectedCacheItems:[],loaded:false}
        }

        default:
            return state;
    }
}
