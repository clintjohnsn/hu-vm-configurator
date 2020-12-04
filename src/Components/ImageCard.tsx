import { Card, CardContent, CardHeader,Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ImageType, setFunctionType, StateType } from '../Types';

type Props = {
    image:ImageType,
    state:StateType,
    setFunctions:setFunctionType,
}

const ImageCard:React.FC<Props> =({image,state,setFunctions})=>{
    let [selectedVariation,setSelectedVariation] = useState('');
    let imageVariations = image.variations.map(s=>{
            return(
                <div key={s} onClick={()=>{setSelectedVariation(s)}}>
                    <input type="radio" id={image.id+s} name={image.id.toString()} value={s} />
                    <label htmlFor={image.id+s}>{s}</label><br/>
                </div>   
            );
        });


    return(
        <div>
            <Card>
                
                <CardContent>
                    <div className="cardFlexBox">
                        <div className="greyBox"></div>
                        
                        <div className="imageDesc"> 
                            <h2>{image.name}</h2>
                            <p>{image.desc}</p> 
                        </div>
                        <div className ="imageSelection">
                            {image.variations.length === 1?<p>{image.variations[0]}</p>:imageVariations}
                            <Button variant="contained" color="primary" 
                            onClick={()=>{setFunctions.setImageDetails(image.id,selectedVariation.length !== 0?selectedVariation:image.variations[0])}}>Select</Button>
                        </div>
                    </div>                    
                </CardContent>                    
            </Card>
            
        </div>
    )
}

export default ImageCard;