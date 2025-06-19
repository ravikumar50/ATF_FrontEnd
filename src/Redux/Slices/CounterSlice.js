import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
    name : 'counter',
    initialState: {passed:0, failed: 0, skipped:0},
    reducers: {
        addCounts: (state, action) => {
            const { passed = 0, failed = 0, skipped = 0 } = action.payload;
            state.passed += Number(passed);
            state.failed += Number(failed);
            state.skipped += Number(skipped);
        },
        resetCounts: (state) => {
        state.passed = 0;
        state.failed = 0;
        state.skipped = 0;
        }
    }
})

export const {addCounts, resetCounts} = CounterSlice.actions;
export default CounterSlice.reducer;