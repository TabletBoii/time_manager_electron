import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { todoReducer } from 'renderer/entities/ToDo'

export function createReduxStore(initialState?: StateSchema){
    const rootReducers: ReducersMapObject<StateSchema> = {
        todo: todoReducer
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        preloadedState: initialState
    })
}
