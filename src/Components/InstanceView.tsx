import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { MockDataType, setFunctionType, StateType } from "../Types";

type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
};

const InstanceView: React.FC<Props> = ({ data, state, setFunctions }) => {
  let [selectedInstance, setSelectedInstance] = useState(0);

  let instanceButtons = data.instances.map((instance) => {
    const instanceButtonVariant =
      state.instance?.instanceId === instance.id ? "primary" : "secondary";
    return (
      <div className="buttonsWrapper" key={instance.id}>
        <Button
          variant="contained"
          color={instanceButtonVariant}
          onClick={() => {
            setFunctions.setInstance({
              ...state.instance,
              instanceId: instance.id,
            });
            setSelectedInstance(instance.id);
          }}
        >
          {instance.desc}
        </Button>
      </div>
    );
  });

  let memoryVariantList = data.instances
    .filter((instance) => instance.id === selectedInstance)[0]
    ?.memory.map((memoryVariant) => {
      return (
        <option value={memoryVariant.val} key={memoryVariant.val}>
          {memoryVariant.val}
        </option>
      );
    });

  let cpuVariantList = data.instances
    .filter((instance) => instance.id === selectedInstance)[0]
    ?.cpu.map((cpuVariant) => {
      return (
        <option value={cpuVariant.val} key={cpuVariant.val}>
          {cpuVariant.val}
        </option>
      );
    });

  return (
    <div>
      <div className="instanceTypeWrapper">
        <Grid container>{instanceButtons}</Grid>
      </div>
      {selectedInstance !== 0 ? (
        <div>
          <h3>Create Configuration</h3>
          <hr />
          <Grid container className="instanceConfigOptions">
            <p>CPU Cores</p>
            <select
              name="cpuVariant"
              onChange={(e) => {
                setFunctions.setInstance({
                  ...state.instance,
                  cpuVariant: e.target.value,
                });
              }}
            >
              {cpuVariantList}
            </select>
            <p>Memory</p>
            <select
              name="memoryVariant"
              onChange={(e) => {
                setFunctions.setInstance({
                  ...state.instance,
                  memoryVariant: e.target.value,
                });
              }}
            >
              {memoryVariantList}
            </select>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default InstanceView;
