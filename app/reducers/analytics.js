/**
 * Created by Darkstar on 1/12/2017.
 */

const defaultState = {
	bulkAnalytics : {},
	analyticsApi : {},
	analyticsStorage : {}
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'RECEIVE_ANALYTICS' : {
        	state.bulkAnalytics = action.payload
            return Object.assign({},state)
        }
        case 'ANALYTICS_API' : {
            state.analyticsApi = action.payload
            return Object.assign({},state)
        }
        case 'ANALYTICS_STORAGE' : {
            state.analyticsStorage = action.payload
            return Object.assign({},state)
        }
        case 'RESET' : {
            state.analyticsStorage = {}
            state.analyticsApi = {}
            return Object.assign({},state)
        }
        default:
            return state;
    }
}
