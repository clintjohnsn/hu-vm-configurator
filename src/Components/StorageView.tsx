import { Button } from "@material-ui/core";
import React from "react";
import { MockDataType, setFunctionType, StateType } from "../Types";
import NetworkView from "./NetworkView";
import StorageCard from "./StorageCard";
type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
};

const StorageView: React.FC<Props> = ({ data, state, setFunctions }) => {
  const renderExtStorageList = state.storage.ext.map((s) => {
    return (
      <StorageCard
        key={s.id}
        id={s.id}
        volume="Ext"
        data={data}
        state={state}
        setFunctions={setFunctions}
      />
    );
  });

  return (
    <div style={{ maxHeight: 480, overflow: "auto" }}>
      <StorageCard
        volume="Root"
        data={data}
        state={state}
        setFunctions={setFunctions}
      />
      {renderExtStorageList}
      <Button
        className="addVolumeButton"
        color="default"
        variant="contained"
        onClick={() => setFunctions.addExtStorage()}
      >
        {" "}
        Add Volume{" "}
      </Button>
      <NetworkView data={data} state={state} setFunctions={setFunctions} />
    </div>
  );
};

export default StorageView;
