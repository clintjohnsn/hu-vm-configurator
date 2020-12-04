import { Card, CardContent, CardHeader,Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ImageType, MockDataType, setFunctionType, StateType } from '../Types';
import ImageCard from './ImageCard';

type Props = {
    data:MockDataType,
    state:StateType,
    setFunctions:setFunctionType,
}

const Summary:React.FC<Props> = ({data,state,setFunctions})=>{
    let image = data.images.filter(image=>image.id===state.imageId)[0];
    console.log(image)
    return(
        <div>
            <h2>Image</h2>
            {image?<ImageCard image={image} state={state} setFunctions={setFunctions}/>:null}
        </div>
    )
}

export default Summary;