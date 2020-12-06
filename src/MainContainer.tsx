import React, { useEffect,useState } from 'react';
import MainView from './Components/MainView';
import CostView from './Components/CostView'
import { Container, Grid } from '@material-ui/core';
import mockData from './MockData'
import { InstanceType, SelectedInstanceType, SelectedStorageType, StateType } from './Types';
import { calculateBandwidthCost } from './Utility';


const MainContainer:React.FC = ()=>{

    let [state,setState] = useState<StateType>({
        imageId:null,
        imageVariation:null,
        region:'us-east-1',
        instance:null,
        bandwidth:null,
        storage:{
            root:{
                id:0,
                typeId:1,
                capacity:100,
                encryption:true,
                backupRequired:true,
                remarks:"",
            },
            ext:[]
        },
    });

    const addExtStorage = ()=>{
        let s = {
            id:Date.now(),
            typeId:1,
            capacity:100,
            encryption:true,
            backupRequired:true,
            remarks:"",
        }
        setState({...state,
            storage:{...state.storage,
                ext:[...state.storage.ext,s]
            }
        });
    }

    const deleteExtStorage = (id:number)=>{
        let index = state.storage.ext.findIndex(i=>i.id === id);
        let newExtArray = [...state.storage.ext];
        newExtArray.splice(index,1);
        setState({...state,
            storage:{...state.storage,
                ext:newExtArray
            }
        });
    }

    const setFunctions = {
        setImageDetails:(id:number, variation:string)=>{
            setState({...state,imageId:id,imageVariation:variation});
        },
        setRegion:(region:string)=>{
            setState({...state,region:region});
        },
        setInstance:(instance:SelectedInstanceType)=>{
            setState({...state,instance:instance});
        },
        setBandwidth:(bandwidth:number) =>{
            setState({...state,bandwidth:bandwidth});
        },
        addExtStorage:addExtStorage,
        deleteExtStorage:deleteExtStorage,
        setStorage:(volume:string, storage:SelectedStorageType)=>{
            if (volume === 'Root'){
                setState({...state,storage:{...state.storage,root:storage}});
            }else{
                let newExtList = [...state.storage.ext]
                newExtList = newExtList.map(s=>{
                    if(s.id === storage.id){
                        return storage;
                    }
                    return s;
                });
                setState({...state,storage:{...state.storage,ext:newExtList}})
            }
        }
    }

    let [cost,setCost] = useState(0);

    const calculateCost = ()=>{
        let newCost:number = 0;
        if (state.imageId !== null){
            mockData.images.forEach(image => {
                if (image.id === state.imageId){
                    newCost+=image.cost;
                }
            });
        }
        if(state.instance !==null){
            mockData.instances.forEach(instance=>{
                if(instance.id === state.instance?.instanceId){
                    instance.memory.forEach(variant=>{
                        if(variant.val === state.instance?.memoryVariant){
                            newCost+=variant.cost;
                        }
                    });
                    instance.cpu.forEach(variant=>{
                        if(variant.val === state.instance?.cpuVariant){
                            newCost+=variant.cost;
                        }
                    });
                }
            });
        }

        if(state.bandwidth!==null){
            newCost+=calculateBandwidthCost(state.bandwidth);
        }

        if(state.storage.ext.length!==0){
            mockData.storage.forEach(storageType =>{
                newCost+= state.storage.ext.filter(s=>s.typeId === storageType.id).length * storageType.cost;
            })
        }

        setCost(newCost);
    }

    const setInstanceDefaults = (instance:InstanceType)=>{
        setState({...state,instance:{
            instanceId:instance.id,
            memoryVariant:instance.memory[0].val,
            cpuVariant:instance.cpu[0].val,
        }});
    }
    const validateState= ()=>{
        if(state.imageId !== null){
            mockData.images.forEach(image=>{
                if (image.id === state.imageId){
                    if(!image.region.some(region=>{
                        return region === state.region;
                    })){
                        alert(`${image.name} is not available for the selected region`);
                        setState({...state,imageId:null});
                    }
                }
            });
        }
        if(state.instance !== null){
            mockData.instances.forEach(instance=>{
                if (instance.id === state.instance?.instanceId){
                    if(state.instance.cpuVariant !== undefined){
                        if(!instance.memory.some(variant=>{
                            return variant.val === state.instance?.memoryVariant
                        })){
                            alert(`${state.instance.memoryVariant} is not available for the selected instance type`);
                            setInstanceDefaults(instance);
                        }
                    }else{
                        setInstanceDefaults(instance);
                    }
                    if(state.instance.memoryVariant!==undefined){
                        if(!instance.cpu.some(variant=>{
                            return variant.val === state.instance?.cpuVariant
                        })){
                            alert(`${state.instance.cpuVariant} is not available for the selected instance type`);
                            setInstanceDefaults(instance);
                        }
                    }else{
                        setInstanceDefaults(instance);
                    }
                }
            });       
        }
    }

    useEffect(() => {
        calculateCost();
        validateState()
     }, [state]);

    console.log(state)
    
    return (
        <div>
            <h1>HVC</h1>
            <Container maxWidth="lg">
                <Grid container>
                    <MainView data={mockData} state={state} setFunctions={setFunctions}/>
                    <CostView data={mockData} state={state} cost={cost}/>
                </Grid>
            </Container>
            
        </div>
    );
}

export default MainContainer;