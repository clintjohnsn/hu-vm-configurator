import { Grid,Button } from '@material-ui/core';
import React, { useState } from 'react';
import mockData from '../MockData';
import { MockDataType, setFunctionType, StateType } from '../Types';
import ImageListView from './ImageListView';
import InstanceView from './InstanceView';
import StorageView from './StorageView';
import SummaryView from './SummaryView';

type Props ={
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType
}

const MainView:React.FC<Props> = ({data,state,setFunctions})=>{

    let [page,setPage]=useState(1);
    const regionList = data.regions.map(region=>{
        return(
        <option value={region} key={region}>
            {region}
        </option>
        )
    });

    
    let tabsList = ['Choose Image','Choose Instance Type','Choose Storage & Network','Configure Security','Review & Launch']
    let renderTabsList = tabsList.map((tabName,index)=>{
        const variant = index+1===page?"primary":"default";
        return <Button key={index} variant="contained" color={variant} onClick={()=>setPage(index+1)}>
                    {`${index+1}.`}{tabName}
                </Button>
    })
    return (
        <div className="mainView">
            <div>
                <div className='header'>
                    <h2>{tabsList[page-1]}</h2>
                    <select name="regions" onChange={(e)=>{setFunctions.setRegion(e.target.value)}}>
                        {regionList}
                    </select>
                </div>
                <Grid container>
                   {renderTabsList}
                </Grid>
            </div>
            <div className="mainContent">
                {page===1?<ImageListView data={mockData} state={state} setFunctions={setFunctions}/>:null}
                {page===2?<InstanceView data={mockData} state={state} setFunctions={setFunctions}/>:null}
                {page===3?<StorageView data={mockData} state={state} setFunctions={setFunctions}/>:null}
                {page===5?<SummaryView data={mockData} state={state} setFunctions={setFunctions}/>:null}
            </div>
            <div className="footer">
                {page!==1?<Button onClick={()=>setPage(page-1)}>Back</Button>:null}
                <Button onClick={()=>setPage(page!==5?page+1:5)}>Proceed</Button>
            </div>
        </div>
    );
}

export default MainView;