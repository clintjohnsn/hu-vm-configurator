import { Grid,Button } from '@material-ui/core';
import React, { useState } from 'react';
import { MockDataType, setFunctionType, StateType } from '../Types';
import ImageCard from './ImageCard';

type Props ={
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType
}

const MainView:React.FC<Props> = ({data,state,setFunctions})=>{

    
    const imageList = data.images.map(image=>{
        return (
        <ImageCard key={image.id.toString()} image={image} state={state} setFunctions={setFunctions}/>
        )
    });

    const regionList = data.regions.map(region=>{
        return(
        <option value={region} key={region}>
            {region}
        </option>
        )
    });
    return (
        <div className="mainView">
            <div>
                <div className='header'>
                    <h2>Choose Image</h2>
                    <select name="regions" onChange={(e)=>{setFunctions.setRegion(e.target.value)}}>
                        {regionList}
                    </select>
                </div>
                <Grid container>
                    <Button variant="contained" color="primary" >1.Choose Image</Button>
                    {/* <Button>2.Choose Instance Type</Button>
                    <Button>3.Choose Storage & Network</Button>
                    <Button>4.Configure Security</Button> */}
                    <Button variant="contained" color="primary">5.Review & Launch </Button>
                </Grid>
            </div>
            <div>
                {imageList}
            </div>
        </div>
    );
}

export default MainView;