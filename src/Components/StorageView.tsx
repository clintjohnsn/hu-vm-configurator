import React, { useState } from 'react';
import { MockDataType, setFunctionType, StateType } from '../Types';
import NetworkView from './NetworkView';
import StorageCard from './StorageCard';
type Props = {
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType,
}

const StorageView:React.FC<Props>=({data,state,setFunctions})=>{

    return(
        <div>
            <StorageCard data={data} state={state} setFunctions={setFunctions}/>
            <NetworkView data={data} state={state} setFunctions={setFunctions}/>
        </div>
    );
}

export default StorageView;