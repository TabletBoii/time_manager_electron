import { createSlice } from "@reduxjs/toolkit"
import { ToDoSchema } from "../types/todo";

const initialState: ToDoSchema = {}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
})

export const { actions: todoActions } = todoSlice;
export const { reducer: todoReducer } = todoSlice;
