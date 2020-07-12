import React, { useState } from 'react';

const defaultState = {
  var: false,
  string: 'a string',
  function: () => {}
};

export const GlobalContext = React.createContext(defaultState);

export const GlobalProvider = props => {
  const [state, setState] = useState({ ...defaultState });
  // const [getVar , setVar] = useState({var: false});
  const triggerFunction = (props) => {
    if(props){
      setState({ ...state, var: props });
    }
    else{

      if (state.var) {
        setState({ ...state, var: false });
      } else {
        setState({ ...state, var: true });
      }
    }
    console.log('function triggered', state.var);
  };
  return (
    <GlobalContext.Provider
      value={{
        var: state.var,
        string: state.string,
        function: triggerFunction
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
