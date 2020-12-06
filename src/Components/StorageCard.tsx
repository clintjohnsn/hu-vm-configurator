import React from 'react';
import { MockDataType, setFunctionType, StateType } from '../Types';
type Props = {
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType,
}

const StorageCard:React.FC<Props> =({data,state,setFunctions})=>{
    return(
        <h1>sdf</h1>
    );
}

export default StorageCard;
