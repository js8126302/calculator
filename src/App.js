import {useState, useEffect} from 'react';
import './styles.css';




const calcData = [
  {id: "clear", value: "AC"},
  {id: "divide", value: "/"},
  {id: "multiply", value: "*"},
  {id: "seven", value: "7"},
  {id: "eight", value: "8"},
  {id: "nine", value: "9"},
  {id: "subtract", value: "-"},
  {id: "four", value: "4"},
  {id: "five", value: "5"},
  {id: "six",  value: "6"},
  {id: "add",  value: "+"},
  {id: "one",  value: "1"},
  {id: "two",  value: "2"},
  {id: "three", value: "3"},
  {id: "equals", value: "="},
  {id: "zero", value: "0"},
  {id: "decimal", value: "."},
  
];

const operators = ["/", "*", "+", "-"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


const Display = ({input, output}) => (
  <div className ="output">
    <span className="result">{output}</span>
    <span className="input">{input}</span>
  </div>
    );

/*const Key = ({keyData: {id, value}, handleInput}) => (
      <button id={id} onClick={()=> handleInput(value)}>
        {value}
        </button> 
    
    );
const KeyBoard = ({handleInput}) => (
      <div className="keys">
        {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
      </div>
    ); */
   

    const KeyBoard = ({keyData, handleInput}) => (
      <div className = "keys">
        {keyData.map((element) => {
          return (
            <button key ={element.id} id = {element.id} onClick = {() => handleInput(element.value)}>
              {element.value}
            </button>
            )
        }
          )

        }
      </div>
    )




const App = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState('');

  const handleSubmit = () => {
    const result = eval(calculatorData).toFixed(4).replace(/\.?0*$/, "");
    setOutput(result);
    setCalculatorData(result);
    setInput("");

    console.log("handleSubmit")

  };
  const handleClear = () => {
    setInput("0");
    setCalculatorData("")
    setOutput("")
    console.log("handleClear")

  };
  const handleDecimal = () => {
    if (input.includes(".")){
      setCalculatorData(calculatorData);
      setInput(input);
    }
    else if ((input.length === 0 || operators.includes(input))) {
      setInput("0.");
      setCalculatorData(calculatorData + "0.")
    }
    else {
      setInput(input + '.')
      setCalculatorData(calculatorData + '.')
    }
      

    
    console.log("handleDecimal")

  };
  const handleNumbers = (value) => {
   /*if (calculatorData.length === 1 && calculatorData === '0') {
      setInput("");
      setCalculatorData(value);
    } else {
      if (value === '0' && (calculatorData === '0' || input === '0')) {
        setCalculatorData(calculatorData);
      }
      else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1)
        const isLastCharOperator = operators.includes(lastChar);
        setInput(isLastCharOperator ? value : calculatorData + value);
        setCalculatorData(calculatorData + value)
      }
    

    } */
    if (calculatorData === '0' || input === '0') {
      if (value === '0') {
        setInput('0');
        setCalculatorData('0')
      }
      else {
      setInput(value);
      setCalculatorData(value);
      }
    }
    else if (output === calculatorData) {
      setInput(value);
      setCalculatorData(value);
    }
    else {
      const lastChar = calculatorData[calculatorData.length - 1];
      console.log("last char :", lastChar)
      switch(lastChar) {
        case numbers.find(num => num === lastChar):
          setInput(input + value);
          setCalculatorData(calculatorData + value)
          break;
        case operators.find(op => op === lastChar): 
           setInput(value);
           setCalculatorData(calculatorData + " " + value);
           break;
        case ".": //decimal point
          setInput(input + value);
          setCalculatorData(calculatorData + value)
          break;
        default:
          break;

          
      }
    
    }

    console.log("handleNumbers" + "  " + value)

  };
  const handleOperators = (value) => {
    if (calculatorData === '0' && input === '0') {
      setCalculatorData(0);
      setInput(0);
    } 
    else if (output === calculatorData) {
      setCalculatorData(calculatorData + " " + value);
      setInput(value);
    }
    else {
      const lastChar = calculatorData[calculatorData.length - 1];
      if (numbers.includes(lastChar)) {
        setCalculatorData(calculatorData + " " + value);
        setInput(value);
      }
      else if (operators.includes(lastChar)) {
        if (value === "-") {
          setInput(value);
          setCalculatorData(calculatorData + " " + value)
        }
        else {
        setInput(value);
        setCalculatorData(calculatorData.slice(0, -1) + " " + value)
        }
      
      }
      
    }
    
    console.log("handleOperators")

  };

  const handleInput = (value) => {
   
    /*const number = numbers.map(num => num.toString()).find(num => num === value);
    console.log(value)
    const operator = operators.find((op) => op === value); */
    switch(value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case ".":
        handleDecimal();
        break;
      case numbers.find((num => num === value)):
        handleNumbers(value);
        break;
      case operators.find(op => op === value):
        handleOperators(value);
        break;
      default:
          break;
    }
    
  }

  const handleOutput = () => {
   
  }

 

  /*useEffect(() => {
    handleOutput()

  },[calculatorData] ); */


          
  return (
    <div className="container">
        <div className="calculator"> 
              <Display  input = {input} output = {output} />
              
              <KeyBoard keyData={calcData} handleInput = {handleInput} />
             {/* <h1> Calculator DATA: {calculatorData}</h1>
              <hr />
              <h1> OUTPUT: {output}</h1> */}

              
              
      
        </div>

    </div>
          
          );
};
export default App;
