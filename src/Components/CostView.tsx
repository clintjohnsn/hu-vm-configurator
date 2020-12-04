import React from 'react';
import {Card, CardContent, CardHeader, Grid} from '@material-ui/core';
import { MockDataType, StateType } from '../Types';

type Props = {
    data:MockDataType,
    state:StateType,
    cost:number
}

const CostView:React.FC<Props> = ({data,state,cost})=>{
    
    let selectedImage = data.images.filter(image=>{
        return image.id === state.imageId;
    })[0];

    return (
        <div className="costView" >
            <Card>
                <CardHeader title='Cost Estimates'>
                </CardHeader>
                <CardContent>
                    {selectedImage?<p>{selectedImage.name} - {selectedImage.cost}</p>:<p></p>}
                    <hr/>
                    <h4 className="cost">$ {cost}/mo</h4>
                </CardContent>
            </Card>
        </div>
    );
}

export default CostView;