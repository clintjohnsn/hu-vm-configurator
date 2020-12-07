import React, { useEffect, useState } from "react";
import MainView from "./Components/MainView";
import CostView from "./Components/CostView";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { calculateBandwidthCost, getMemoryFormat } from "./Utility";
import mockData from "./MockData";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  withStyles,
} from "@material-ui/core";
import {
  InstanceType,
  SelectedInstanceType,
  SelectedStorageType,
  StateType,
} from "./Types";

const MainContainer: React.FC = () => {
  let [state, setState] = useState<StateType>({
    imageId: null,
    imageVariation: null,
    region: "us-east-1",
    instance: null,
    bandwidth: null,
    storage: {
      root: {
        id: 0,
        typeId: 1,
        capacity: 100,
        encryption: true,
        backupRequired: true,
        remarks: "",
      },
      ext: [],
    },
  });

  const addExtStorage = () => {
    let s = {
      id: Date.now(),
      typeId: 1,
      capacity: 100,
      encryption: true,
      backupRequired: true,
      remarks: "",
    };
    setState({
      ...state,
      storage: { ...state.storage, ext: [...state.storage.ext, s] },
    });
  };

  const deleteExtStorage = (id: number) => {
    let index = state.storage.ext.findIndex((i) => i.id === id);
    let newExtArray = [...state.storage.ext];
    newExtArray.splice(index, 1);
    setState({ ...state, storage: { ...state.storage, ext: newExtArray } });
  };

  const setFunctions = {
    setImageDetails: (id: number, variation: string) => {
      setState({ ...state, imageId: id, imageVariation: variation });
    },
    setRegion: (region: string) => {
      setState({ ...state, region: region });
    },
    setInstance: (instance: SelectedInstanceType) => {
      setState({ ...state, instance: instance });
    },
    setBandwidth: (bandwidth: number) => {
      setState({ ...state, bandwidth: bandwidth });
    },
    addExtStorage: addExtStorage,
    deleteExtStorage: deleteExtStorage,
    setStorage: (volume: string, storage: SelectedStorageType) => {
      if (volume === "Root") {
        setState({ ...state, storage: { ...state.storage, root: storage } });
      } else {
        let newExtList = [...state.storage.ext];
        newExtList = newExtList.map((s) => {
          if (s.id === storage.id) {
            return storage;
          }
          return s;
        });
        setState({ ...state, storage: { ...state.storage, ext: newExtList } });
      }
    },
  };

  let [cost, setCost] = useState(0);

  const calculateCost = () => {
    let newCost: number = 0;
    if (state.imageId !== null) {
      mockData.images.forEach((image) => {
        if (image.id === state.imageId) {
          newCost += image.cost;
        }
      });
    }
    if (state.instance !== null) {
      mockData.instances.forEach((instance) => {
        if (instance.id === state.instance?.instanceId) {
          instance.memory.forEach((variant) => {
            if (variant.val === state.instance?.memoryVariant) {
              newCost += variant.cost;
            }
          });
          instance.cpu.forEach((variant) => {
            if (variant.val === state.instance?.cpuVariant) {
              newCost += variant.cost;
            }
          });
        }
      });
    }

    if (state.bandwidth !== null) {
      newCost += calculateBandwidthCost(state.bandwidth);
    }

    if (state.storage.ext.length !== 0) {
      mockData.storage.forEach((storageType) => {
        newCost +=
          state.storage.ext.filter((s) => s.typeId === storageType.id).length *
          storageType.cost;
      });
    }

    setCost(newCost);
  };

  const setInstanceDefaults = (instance: InstanceType) => {
    setState({
      ...state,
      instance: {
        instanceId: instance.id,
        memoryVariant: instance.memory[0].val,
        cpuVariant: instance.cpu[0].val,
      },
    });
  };
  const validateState = () => {
    if (state.imageId !== null) {
      mockData.images.forEach((image) => {
        if (image.id === state.imageId) {
          if (
            !image.region.some((region) => {
              return region === state.region;
            })
          ) {
            alert(`${image.name} is not available for the selected region`);
            setState({ ...state, imageId: null });
          }
        }
      });
    }
    if (state.instance !== null) {
      mockData.instances.forEach((instance) => {
        if (instance.id === state.instance?.instanceId) {
          if (state.instance.cpuVariant !== undefined) {
            if (
              !instance.memory.some((variant) => {
                return variant.val === state.instance?.memoryVariant;
              })
            ) {
              alert(
                `${state.instance.memoryVariant} is not available for the selected instance type`
              );
              setInstanceDefaults(instance);
            }
          } else {
            setInstanceDefaults(instance);
          }
          if (state.instance.memoryVariant !== undefined) {
            if (
              !instance.cpu.some((variant) => {
                return variant.val === state.instance?.cpuVariant;
              })
            ) {
              alert(
                `${state.instance.cpuVariant} is not available for the selected instance type`
              );
              setInstanceDefaults(instance);
            }
          } else {
            setInstanceDefaults(instance);
          }
        }
      });
    }
    if (state.bandwidth) {
      if (state.bandwidth > 1024 && state.instance?.instanceId !== 3) {
        setState({ ...state, bandwidth: 1024 });
        alert(
          "Outbound network transfer range for this instance is 512 GB - 1 TB only"
        );
      }
    }

    if (state.storage.ext.length > 0) {
      state.storage.ext.forEach((storage) => {
        let storageVariant = mockData.storage.filter(
          (s) => s.id === storage.typeId
        )[0];
        if (
          !(
            storage.capacity >= storageVariant.minCapacity &&
            storage.capacity <= storageVariant.maxCapacity
          )
        ) {
          if (storage.capacity < storageVariant.minCapacity) {
            let newExtList = [...state.storage.ext];
            newExtList = newExtList.map((s) => {
              if (s.id === storage.id) {
                return { ...s, capacity: storageVariant.minCapacity };
              }
              return s;
            });
            setState({
              ...state,
              storage: { ...state.storage, ext: newExtList },
            });
          } else {
            let newExtList = [...state.storage.ext];
            newExtList = newExtList.map((s) => {
              if (s.id === storage.id) {
                return { ...s, capacity: storageVariant.maxCapacity };
              }
              return s;
            });
            setState({
              ...state,
              storage: { ...state.storage, ext: newExtList },
            });
          }
          alert(
            `${getMemoryFormat(storage.capacity)} is not available for ${
              storageVariant.name
            }`
          );
        }
      });
    }
    if (state.storage.root) {
      let storage = state.storage.root;
      let storageVariant = mockData.storage.filter(
        (s) => s.id === storage.typeId
      )[0];
      if (
        !(
          storage.capacity >= storageVariant.minCapacity &&
          storage.capacity <= storageVariant.maxCapacity
        )
      ) {
        if (storage.capacity < storageVariant.minCapacity) {
          setState({
            ...state,
            storage: {
              ...state.storage,
              root: {
                ...state.storage.root,
                capacity: storageVariant.minCapacity,
              },
            },
          });
        } else {
          setState({
            ...state,
            storage: {
              ...state.storage,
              root: {
                ...state.storage.root,
                capacity: storageVariant.maxCapacity,
              },
            },
          });
        }
        alert(
          `${getMemoryFormat(storage.capacity)} is not available for ${
            storageVariant.name
          }`
        );
      }
    }
  };

  useEffect(() => {
    calculateCost();
    validateState();
  }, [state]);

  const GlobalCss = withStyles({
    "@global": {
      ".MuiButton-root": {
        fontSize: "0.8rem",
        textTransform: "none",
      },
    },
  })(() => null);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "rgb(3, 125, 252)",
      },
      secondary: {
        main: "rgb(255,255,255)",
      },
    },
  });

  console.log(state);
  return (
    <div>
      <GlobalCss />
      <MuiThemeProvider theme={theme}>
        <Paper elevation={8}>
          <h1 className="title">HVC</h1>
        </Paper>
        <Container>
          <Grid container>
            <MainView
              data={mockData}
              state={state}
              setFunctions={setFunctions}
              cost={cost}
            />
            <CostView data={mockData} state={state} cost={cost} />
          </Grid>
        </Container>
      </MuiThemeProvider>
    </div>
  );
};

export default MainContainer;
