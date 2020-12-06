import React from 'react';
import {Card, CardContent, CardHeader, Grid} from '@material-ui/core';
import { MockDataType,StateType } from '../Types';
import { calculateBandwidthCost, getMemoryFormat } from '../Utility';

type Props = {
    data:MockDataType,
    state:StateType,
    cost:number
}

const CostView:React.FC<Props> = ({data,state,cost})=>{
    
    let selectedImage = data.images.filter(image=>{
        return image.id === state.imageId;
    })[0];

    let selectedCpuVariantCost = data.instances.filter(instance=>{
        return instance.id === state.instance?.instanceId
    })[0]?.cpu.filter(cpuVariant=>{
        return cpuVariant.val === state.instance?.cpuVariant;
    })[0]?.cost;

    let selectedMemoryVariantCost = data.instances.filter(instance=>{
        return instance.id === state.instance?.instanceId
    })[0]?.memory.filter(memoryVariant=>{
        return memoryVariant.val === state.instance?.memoryVariant;
    })[0]?.cost;

    let renderExtStorageDetails = data.storage.map(storageVariant=>{
        let count= state.storage.ext.filter(s=>s.typeId === storageVariant.id).length;
        let cost = storageVariant.cost * count;
        if(count>0){
            return <p key={storageVariant.id}>
                Ext {storageVariant.name} ({count}) - ${cost}
            </p>
        }
    });

    return (
        <div className="costView" >
            <Card>
                <CardHeader title='Cost Estimates'>
                </CardHeader>
                <CardContent>
                    {selectedImage?<p>{selectedImage.name} - ${selectedImage.cost}</p>:null}
                    <div>
                    {state.instance?.cpuVariant?
                        <p>CPU - {state.instance.cpuVariant} - ${selectedCpuVariantCost}</p>
                    :null}
                    {state.instance?.memoryVariant?
                        <p>Memory - {state.instance.memoryVariant} - ${selectedMemoryVariantCost}</p>
                    :null}
                    {state.storage.ext.length!==0? renderExtStorageDetails:null}
                    
                    {state.bandwidth?
                        <p>Network Bandwidth - {getMemoryFormat(state.bandwidth)} - ${calculateBandwidthCost(state.bandwidth)}</p>
                    :null}
                    
                    </div>
                    <hr/>
                    <h4 className="cost">$ {cost}/mo</h4>
                </CardContent>
            </Card>
        </div>
    );
}

export default CostView;