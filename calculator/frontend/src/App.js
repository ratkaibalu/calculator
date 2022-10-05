import {useState} from 'react';
import exactMath from 'exact-math';

function App() {
  const [calc, setCalc] = useState("");

  const readMemory = () => {
    fetch('/result')
    .then(res => res.json())
    .then(data => {
      setCalc(data.result);
    })
  }

  const saveMemory = value => {
    fetch('/result', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ result: value })
    })
  }

  const operators = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if((operators.includes(value) && calc === '')  ||
     (operators.includes(value) && operators.includes(calc.slice(-1)))){
      return;
    }
    setCalc(calc + value);
  }

  const calculate = () => {
    setCalc(exactMath.formula(calc).toString());
  }

  const clear = () => {
    setCalc('');
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          { calc || "0"}
        </div>
        <div className="Upper">
          <button className="other_buttons" onClick={() => readMemory()}>Print</button>
          <button className="other_buttons" onClick={() => saveMemory(calc)}>Save</button>
          <button className="other_buttons" onClick={clear}>Clear</button>
          <button className="operator_buttons" onClick={() => updateCalc('/')}>/</button>
        </div>
        <div className="Lower">
            <button className="digit_buttons" onClick={() => updateCalc('7')}>7</button>
            <button className="digit_buttons" onClick={() => updateCalc('8')}>8</button>
            <button className="digit_buttons" onClick={() => updateCalc('9')}>9</button>
            <button className="operator_buttons" onClick={() => updateCalc('*')}>*</button>
            <button className="digit_buttons" onClick={() => updateCalc('4')}>4</button>
            <button className="digit_buttons" onClick={() => updateCalc('5')}>5</button>
            <button className="digit_buttons" onClick={() => updateCalc('6')}>6</button>
            <button className="operator_buttons" onClick={() => updateCalc('-')}>-</button>
            <button className="digit_buttons" onClick={() => updateCalc('1')}>1</button>
            <button className="digit_buttons" onClick={() => updateCalc('2')}>2</button>
            <button className="digit_buttons" onClick={() => updateCalc('3')}>3</button>
            <button className="operator_buttons" onClick={() => updateCalc('+')}>+</button>
            <button className="zero_button" onClick={() => updateCalc('0')}>0</button>
            <button className="digit_buttons" onClick={() => updateCalc('.')}>.</button>
            <button className="operator_buttons" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
