import React from 'react'
import { Icon, Input } from 'semantic-ui-react'
import './Search.css';

const InputExampleIconElement = (props) => (
  <Input 
   id="inp"
   icon={<Icon id="sea" name='search' inverted circular link />} 
   placeholder='Search...'  
   onChange={props.onchange}
   value={props.value}/>
)

export default InputExampleIconElement