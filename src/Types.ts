import { type } from "os";

export type ImageType ={
        id:number,
        name:string,
        desc:string,
        variations:string[],
        cost: number,
        region:string[],
}

export type MockDataType ={
    regions:string[],
    images:ImageType[],
}

export type StateType ={
    imageId:number|null,
    imageVariation:string|null,
    region:string|null,
    cost:number,
}

export type setFunctionType = {
    setImageDetails:(id:number, variation:string)=>void,
    setRegion:(region:string)=>void
}