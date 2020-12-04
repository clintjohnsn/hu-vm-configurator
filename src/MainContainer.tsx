import React, { useState } from 'react';
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
        cost:0
    });

    const calculateCost = (state:StateType)=>{
        let cost:number = 0;
        if (state.imageId !== null){
            mockData.images.forEach(image => {
                if (image.id === state.imageId){
                    cost+=image.cost;
                }
            });
        }
        return cost;
    }

    const setFunctions = {

        setImageDetails:(id:number, variation:string)=>{
            setState({...state,imageId:id,imageVariation:variation,cost:calculateCost(state)});
        },
        setRegion:(region:string)=>{
            setState({...state,region:region});
        },

    }

    console.log(state)
    
    return (
        <div>
            <h1>HVC</h1>
            <Container maxWidth="lg">
                <Grid container>
                    <MainView data={mockData} state={state} setFunctions={setFunctions}/>
                    <CostView/>
                </Grid>
            </Container>
            
        </div>
    );
}

export default MainContainer;