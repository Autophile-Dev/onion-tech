import { createSlice, nanoid } from "@reduxjs/toolkit";

export const TaskSlice = createSlice({
    name: "coininfo",
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            // console.log(nanoid());
            // 'dgPXxUz_6fWIQBD8XmiSy'

            // console.log("action.payload++",action.payload);
            const newTask = {
                id: nanoid(),
                data: action.payload,
            };
            state.splice(0, state.length)
            state.push(action.payload)
            // console.log("state.length",state.length)
            // state.length < 1 ? state.push(action.payload) : None
            // state.push(newTask);
        },
        deleteTask: (state, action) => {
            console.log(action.payload.id);
            console.log(state);
            return state.filter((item) => item.id !== action.payload.id);
        },
    },
});

export const { addTask, deleteTask } = TaskSlice.actions;

export default TaskSlice.reducer;
