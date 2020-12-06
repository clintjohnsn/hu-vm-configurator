import { type } from "os";

export type ImageType ={
    id:number,
    name:string,
    desc:string,
    variations:string[],
    cost: number,
    region:string[],
}

export type InstanceType = {
    id:number,
    name:string,
    desc:string,
    memory:{val:string,cost:number}[],
    cpu:{val:string,cost:number}[],
}

export type MockDataType ={
    regions:string[],
    images:ImageType[],
    instances:InstanceType[],
}

export type SelectedInstanceType ={
    instanceId?:number,
    memoryVariant?:string,
    cpuVariant?:string, 
}

export type StateType ={
    imageId:number|null,
    imageVariation:string|null,
    region:string|null,
    instance:SelectedInstanceType|null,
    bandwidth:number|null,
}

export type setFunctionType = {
    setImageDetails:(id:number, variation:string)=>void,
    setRegion:(region:string)=>void,
    setInstance:(instance:SelectedInstanceType)=>void,
    setBandwidth:(bandwidth:number)=>void,
    
}
