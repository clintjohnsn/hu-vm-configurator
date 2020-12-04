import { Grid,Button } from '@material-ui/core';
import React, { useState } from 'react';
import mockData from '../MockData';
import { MockDataType, setFunctionType, StateType } from '../Types';
import ImageList from './ImageList';
import Summary from './Summary';

type Props ={
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType
}

const MainView:React.FC<Props> = ({data,state,setFunctions})=>{
    const regionList = data.regions.map(region=>{
        return(
        <option value={region} key={region}>
            {region}
        </option>
        )
    });

    const [page,setPage]=useState(1);

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
                    <Button variant="contained" color="primary" onClick={()=>setPage(1)}>1.Choose Image</Button>
                    {/* <Button>2.Choose Instance Type</Button>
                    <Button>3.Choose Storage & Network</Button>
                    <Button>4.Configure Security</Button> */}
                    <Button variant="contained" color="primary" onClick={()=>setPage(2)}>5.Review & Launch </Button>
                </Grid>
            </div>
            <div className="mainContent">
                {page===1?<ImageList data={mockData} state={state} setFunctions={setFunctions}/>:null}
                {page===2?<Summary data={mockData} state={state} setFunctions={setFunctions}/>:null}
            </div>
        </div>
    );
}

export default MainView;