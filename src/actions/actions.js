/**
 * Created by laker on 28/09/2017.
 */
const actions = {
    FETCH_ERROR: "fetchError"
};

export function mapToResponseAction(action) {
    return action + "Succeeded";
}

export default actions;