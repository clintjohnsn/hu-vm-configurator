import React from 'react';
import {Card, CardContent, CardHeader, Grid} from '@material-ui/core';

const CostView:React.FC = ()=>{
    return (
        <div className="costView" >
            <Card>
                <CardHeader title='Cost Estimates'>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>sm</li>
                        <li>sdf</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

export default CostView;