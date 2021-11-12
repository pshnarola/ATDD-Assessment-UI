import { useReducer } from "react";

function reducer(state, action) {
    return { ...state, ...action };
}

const initialArgs = {
    flightsOffer: [],
    loading: false
}

const useFlight = appState => {
    const [state, setState] = useReducer(reducer, initialArgs);

    const setFlightsOffer = (flightsOffer) => {
        setState({ ...state, flightsOffer })
    }

    const setLoading = (loading) => {
        setState({ ...state, loading: loading })
    }

    return {
        ...state,
        setFlightsOffer,
        setLoading
    }
}

export default useFlight;