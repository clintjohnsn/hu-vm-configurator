export const calculateBandwidthCost = (bandwidth: number) => {
  if (bandwidth >= 512 && bandwidth <= 1024) {
    return 5;
  } else if (bandwidth > 1024 && bandwidth <= 1536) {
    return 10;
  } else {
    return 15;
  }
};

export const getMemoryFormat = (memory: number) => {
  if (memory < 1024) {
    return memory + " GB";
  } else if (memory >= 1024) {
    return (memory / 1024).toFixed(1) + " TB";
  }
};

export const getIopsFromCapacity = (capacity: number) => {
  if (capacity < 100) return 100;
  if (capacity >= 100 && capacity <= 500) return 600;
  if (capacity > 500) return 1000;
};
