// actions describe the fact that something is happened
// but don't specify how the application's state changes in response.
// this is the job of reducers
// 1. reducers are pure functions
// 2. never change state or action

import {createStore} from "redux";

// action generators are the functions that return action objects
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// reducers
// are pure functions
// output is only determined by the input
// does not change something outside of the scope
// never change state or action

// that one below is not a pure function
// let a = 10;
// const add = (b) => {
//     return a + b
// };

// that one is not pure
// let result;
// const add = (a, b) => {
//     result = a + b
// };

// that one is pure
// const add = (a, b) => {
//     return a + b
// };

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//unsubscribe();

store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(incrementCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 10}));
store.dispatch(setCount({count: 101}));
store.dispatch(resetCount());


