
import { useState , useCallback, useEffect, useRef} from 'react';
 
export function App() {
  const [length, setlenght] = useState(8);
  const [password, setpassword] = useState("");
  const [numberAllowed, setnumberAlowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null)

  
  const generatePassword  = useCallback( () => {
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if(numberAllowed) str += "0123456789"
     if(charAllowed) str += "!@#$%^&*()_+"
     
     for(let i = 1 ; i< length ; i++){
     const char =  Math.floor(Math.random()*str.length + 1)
     pass += str.charAt(char)
     }
     setpassword(pass)
     
  }, [length , numberAllowed , charAllowed] )

const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
}

  
  useEffect( ()=>{
    generatePassword()
  }, [length , numberAllowed , charAllowed] )
    
  

  return (
    <div className='w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md'>
      <h1 className='my-3 text-center text-white'>Password Generator </h1>
      <div className='mb-4 overflow-hidden rounded-lg flex-shadow'>

        <input type="text"
          value={password}
          className='w-full px-3 py-2 outline-none'
          placeholder='Password'
          readOnly 
          ref={passwordRef}
          />
        <button 
        onClick={copyPasswordToClipboard}
        className='px-3 text-white bg-blue-700 outline-none py-0.5 shrink-0'>Copy</button>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={5}
              max={9}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setlenght(e.target.value)}
              name=""
              id="" />
            <label htmlFor='lenght'> Length: {length-1}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAlowed((prev) => !prev);
              }}
              name=""
              id="" />
            <label htmlFor='number'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              name=""
              id="" />
            <label htmlFor='charinput'>Characters</label>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App 