import './App.css';
import { useState, useCallback } from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function App() {

  const [suggestions, setSuggestions] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 200);
    };
  };

  const handleChange = (value) => {
    fetch(`http://localhost:5055/BingApi?LocationName=${value}`)
      .then((res) => res.json())      
      .then((json) => json !== undefined && setSuggestions(json));      
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  return (
    <div style={{
      display: "block",
      marginLeft: "auto",
      marginTop: "60px",
      textAlign: "center"
    }}>  
  
    <Autocomplete
     style={{ width: 500, margin: "auto" }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={ (suggestions.length > 0 || suggestions ==="") ?  suggestions.map((option) => option.locationName): []}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Bing search"
            variant="outlined"      
            onChange={(e) => optimizedFn(e.target.value)}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}     
          />
        )}
      />
    </div>
  );
}

export default App;
