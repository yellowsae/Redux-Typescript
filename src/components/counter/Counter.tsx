import styles from './Counter.module.css';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  incrementIfEven,
  selectCount
} from './counterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';


import { useState } from 'react';


const Counter = () => {

  const count = useAppSelector(selectCount)

  const dispatch = useAppDispatch()

  // 定义响应式数据
  const [incrementAmount, setIncrementAmount] = useState<string>('2')


  // 具体使用的数据
  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button >
        <button
          onClick={() => {
            dispatch(incrementIfEven(incrementValue))
          }}
          className={styles.button}
        >Add if Even</button>
      </div>
    </div>
  );
}


export default Counter;
