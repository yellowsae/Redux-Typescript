import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store/store";
import { fetchCount } from "./counterAPI";

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle'
}

// 定义异步修改的方法 
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    // 异步请求
    const response = await fetchCount(amount);
    return response.data;
  }
)


const CounterSlice = createSlice({
  name: 'counter',
  initialState,

  // 定义异步修改的方法
  reducers: {
    increment: (state: CounterState) => {
      state.value = state.value + 1;
    },
    decrement: (state: CounterState) => {
      state.value = state.value - 1;
    },

    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      // action 传入参数修改
      state.value = state.value + action.payload;
    }
  },

  // extraReducers 用于处理异步请求 分别处理 pending fulfilled rejected
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state: CounterState) => {
        // .addCase 方法 用于处理异步请求 pending 为请求中
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state: CounterState, action: PayloadAction<number>) => {
        state.status = 'idle';
        state.value = state.value + action.payload;
      })
      .addCase(incrementAsync.rejected, (state: CounterState) => {
        state.status = 'failed';
      })
  },
})



// AppThunk 用于单独定义方法 
// 单独定义的方法  奇数加 x 
export const incrementIfOdd = (amount: number): AppThunk => {
  // 返回 用于修改 state 的 一个方法 ； dispatch 用于触发 action  getState 用于获取 state ; 
  // 在 store.ts 中定义了 AppThunk 类型
  return (dispatch, getState) => {
    // selectCount 用于获取 state.counter.value
    // getState() 用于获取 当前的 state
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  }
}


// 单独定义方法 偶数加 x
export const incrementIfEven = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 0) {
      // dispatch 用于触发 action
      dispatch(incrementByAmount(amount))
    }
  }
}



// 导出 selector  选中的 state.counter.value 
export const selectCount = (state: RootState) => state.counter.value;

// 导出 action
export const {
  increment,
  decrement,
  incrementByAmount
} = CounterSlice.actions;

// 导出默认 counterSlice 
export default CounterSlice.reducer;
