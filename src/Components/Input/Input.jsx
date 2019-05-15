import React, {useState} from 'react';



function Input(props) {
  const {placeholder, name, changeState} = props;//required props
  const [input, setInput] = useState({});
  // creates a variable input and a function setInput which we use like this.setState();

  changeState(input);
  //Our input will take a function that will always be called changeState(), and it will take our input value.
  //SO changeState={COMPONENTFUNCTION} will be a function that changes a components hooks state
  //we will also use our placeholder and name as well
  //<Input changeState={COMPONENTFUNCTION} placeholder={'text value here'} />

  //so where we use <Input name='tim' placeholder={text here} changeState={hooksChangeStateFunction} />
  //the hookschangestate will be 
  //  changer(val) {
  //    setState(name: val);
  //  };

  return (
    <div>
      <input name={name} placeholder={placeholder} onChange={(e)=>{setInput({[e.target.name]: e.target.value})}} />
    </div>
  );
};

export default Input;