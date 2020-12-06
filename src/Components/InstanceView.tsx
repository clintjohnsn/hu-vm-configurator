import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { MockDataType, setFunctionType, StateType } from '../Types';

type Props = {
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType,
}

const InstanceView:React.FC<Props> =({data,state,setFunctions})=>{

    let [selectedInstance,setSelectedInstance] = useState(0);

    let instanceButtons = data.instances.map(instance=>{
        const instanceButtonVariant = state.instance?.instanceId === instance.id ? "outlined":"text";
        return <div key={instance.id}>
            <Button variant={instanceButtonVariant} onClick={()=>{
                setFunctions.setInstance({...state.instance,instanceId:instance.id});
                setSelectedInstance(instance.id);
                }}>
                {instance.desc}
            </Button>
        </div>
    });

    let memoryVariantList = data.instances
                                .filter(instance=>instance.id === selectedInstance)[0]?.memory
                                .map(memoryVariant=>{
                                    return <option value={memoryVariant.val} key={memoryVariant.val}>
                                            {memoryVariant.val}
                                        </option>
                                    
    });

    let cpuVariantList = data.instances
                                .filter(instance=>instance.id === selectedInstance)[0]?.cpu
                                .map(cpuVariant=>{
                                    return <option value={cpuVariant.val} key={cpuVariant.val}>
                                            {cpuVariant.val}
                                        </option>
    });    
    
    return(
        <div>
            <hr/>
            <Grid container>
                {instanceButtons}
            </Grid>
            <h3>Create Configuration</h3>
            {selectedInstance!==0?<Grid container>
            <select name="cpuVariant" onChange={(e)=>{
                setFunctions.setInstance({...state.instance,cpuVariant:e.target.value});
            }}>
                {cpuVariantList}
            </select>
            <select name="memoryVariant" onChange={(e)=>{
                setFunctions.setInstance({...state.instance,memoryVariant:e.target.value});
            }}>
                {memoryVariantList}
            </select>
            </Grid>:null}
            
        </div>)

}

export default InstanceView;