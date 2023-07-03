import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import CounterSlice from '../components/counter/counterSlice';


const store = configureStore({
  reducer: {
    // 引入 CounterSlice
    counter: CounterSlice
  }
})


export default store;


// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
