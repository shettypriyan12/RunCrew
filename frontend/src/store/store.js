import { legacy_createStore as createStore } from "redux";
import { configureStore} from "@reduxjs/toolkit";

import categoryReducer from './categories/categories-slice';
import eventsReducer from './eventsAll/events-slice';
import authReducer from './auth/auth-slice';
import userReducer from './users/users-slice';
import participantReducer from "./registration/registration-slice";
import paymentReducer from './payments/payment-slice';
import resultsReducer from './eventResults/results-slice';

const store = configureStore({
    reducer: {
        categories : categoryReducer,
        events : eventsReducer,
        auth : authReducer,
        users : userReducer,
        participant : participantReducer,
        payment : paymentReducer,
        results : resultsReducer,
    }
});

export default store;