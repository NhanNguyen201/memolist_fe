import { START_POSTING, FINISH_POSTING, POSTING_ERROR, RESET_POSTING_STATE} from '../type'

const initialState = {
    loading: false,
    success: false,
    error: null
}
// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {
        case START_POSTING:
            return {
                loading: true,
                success: false,
                error: null
            }
        case FINISH_POSTING:
            return {
                loading: false,
                success: true,
                error: null
            }
        case POSTING_ERROR: {
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        }
        case RESET_POSTING_STATE: {
            return initialState
        }
        default:
            return state
    }
}