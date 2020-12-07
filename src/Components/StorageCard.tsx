import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { MockDataType, setFunctionType, StateType } from '../Types';
import { getIopsFromCapacity } from '../Utility';
type Props = {
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType,
    volume:string,
    id?:number,
}

const StorageCard:React.FC<Props> =({data,state,setFunctions,volume,id})=>{
    const storage = volume === "Root"? state.storage.root: state.storage.ext.filter(s=>s.id === id)[0]
    let [capacityField,setCapacityField] = useState(storage.capacity.toString());
    let renderStorageTypeList = data.storage.map(storageType=>{
        return <option value={storageType.id} key={storageType.id}>{storageType.name}</option>
    }); 
    let capacityRange = storage.typeId === 1?"20-512 GB":"40-2048 GB";
    return(
        <div>
            <Paper elevation={3}>
                <div className="cardFlexBox">
                    <div>
                        <h4>Type</h4>
                        <select name="types" value={storage.typeId} onChange={(e)=>{
                            setFunctions.setStorage(volume,{...storage,typeId:parseInt(e.target.value)});
                        }}>
                            {renderStorageTypeList}
                        </select>
                    </div>
                    <div>
                        <h4>Volume</h4>
                        <p>{volume}</p>
                    </div>
                    <div>
                        <h4>Capacity(GB)</h4>
                        <input type="text" value={capacityField}
                            placeholder={capacityRange}
                            onChange={(e)=>{setCapacityField(e.target.value)}}
                            onBlur={(e)=>{
                                setFunctions.setStorage(volume,{...storage,capacity:parseInt(e.target.value)});
                        }}/>
                    </div>
                    <div>
                        <h4>Encryption</h4>
                        <input type="checkbox" checked={storage.encryption} 
                            onChange={(e)=>{
                                setFunctions.setStorage(volume,{...storage,encryption:e.target.checked});
                            }}></input>
                    </div>
                    <div>
                        <h4>IOPS</h4>
                        <p>{getIopsFromCapacity(storage.capacity)}</p>
                    </div>
                    <div>
                        <h4>Backup Required</h4>
                        <input type="checkbox" checked={storage.backupRequired} 
                        onChange={(e)=>{
                            setFunctions.setStorage(volume,{...storage,backupRequired:e.target.checked});
                        }}></input>
                    </div>
                    <div>
                        <h4>Remarks</h4>
                        <input type="text" placeholder="Some Remarks" value={storage.remarks}
                        onChange={(e)=>{
                            setFunctions.setStorage(volume,{...storage,remarks:e.target.value}); 
                        }}/>
                    </div>
                </div>
            </Paper>
        </div>
        
    );
}

export default StorageCard;
