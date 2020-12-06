
export const calculateBandwidthCost =(bandwidth:number)=>{
    if(bandwidth >=512 && bandwidth <=1024){
        return 5;
    }else if(bandwidth >1024 && bandwidth <=1536){
        return 10;
    }else{
        return 15;
    }
}

export const getMemoryFormat = (memory:number)=>{
    if(memory<1024){
        return memory + " GB";
    }else if(memory >=1024){
        return (memory/1024).toFixed(1) + " TB";
    }
} 