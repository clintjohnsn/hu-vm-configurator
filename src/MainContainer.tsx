import React, { useEffect, useMemo, useState } from 'react';
import MainView from './Components/MainView';
import CostView from './Components/CostView'
import { Container, Grid } from '@material-ui/core';
import mockData from './MockData'
import { StateType } from './Types';

const MainContainer:React.FC = ()=>{

    let [state,setState] = useState<StateType>({
        imageId:null,
        imageVariation:null,
        region:'us-east-1',
    });

    const setFunctions = {
        setImageDetails:(id:number, variation:string)=>{
            setState({...state,imageId:id,imageVariation:variation});
        },
        setRegion:(region:string)=>{
            setState({...state,region:region});
        },
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
        setCost(newCost);
    }

    const validateState= ()=>{
        mockData.images.forEach(image=>{
            if (image.id == state.imageId){
                if(!image.region.some(region=>{
                    return region === state.region;
                })){
                    setState({...state,imageId:null})
                    alert(`${image.name} is not available for the selected region`);
                }
            }
        })
    }

    useMemo(() => {
        calculateCost();
        validateState()
     }, [state]);


    console.log(state)
    console.log(cost)
    
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