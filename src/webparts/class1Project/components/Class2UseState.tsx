
import React, { useEffect } from "react";
import { useState } from "react";

const Clasa2UseState:React.FC=()=>{

const [count, setCount] = useState<number>(0);

const handleClick = (): void => {
    setCount(count + 1);

};

const handleReset = (): void => {
    setCount(0);

};

useEffect(() => {
    console.log(`Count has been updated to: ${count}`);
}, [count]);


return(
    <div>
        <h2>useState Example</h2>
        <p>{`You clicked ${count} time${count !== 1 ? 's' : ''}!`}</p>
        <button onClick={handleClick}>Click Me</button>
        <button onClick={handleReset}>Reset</button>
    </div>
);


}
export default Clasa2UseState;
