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

export type StorageType = {
    id:number,
    name:string,
    minCapacity:number,
    maxCapacity:number,
    cost:number,
}

export type MockDataType ={
    regions:string[],
    images:ImageType[],
    instances:InstanceType[],
    storage:StorageType[],
}

export type SelectedInstanceType ={
    instanceId?:number,
    memoryVariant?:string,
    cpuVariant?:string, 
}

export type SelectedStorageType = {
    id:number,
    typeId:number,
    capacity:number,
    encryption:boolean,
    backupRequired:boolean,
    remarks:string,
}

export type StateType ={
    imageId:number|null,
    imageVariation:string|null,
    region:string|null,
    instance:SelectedInstanceType|null,
    bandwidth:number|null,
    storage:{
        root:SelectedStorageType,
        ext:SelectedStorageType[]
    },
    
}

export type setFunctionType = {
    setImageDetails:(id:number, variation:string)=>void,
    setRegion:(region:string)=>void,
    setInstance:(instance:SelectedInstanceType)=>void,
    setBandwidth:(bandwidth:number)=>void,
    addExtStorage:()=>void,
    deleteExtStorage:(id:number)=>void,
    setStorage:(volume:string, storage:SelectedStorageType)=>void,

}
