import { Grid } from "@material-ui/core";
import React from "react";
import { MockDataType, setFunctionType, StateType } from "../Types";
import { getMemoryFormat } from "../Utility";

type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
};

const NetworkView: React.FC<Props> = ({ data, state, setFunctions }) => {
  let max = state.instance?.instanceId === 3 ? 2048 : 1024;
  let min = 512;

  return (
    <div>
      <h3>Network Bandwidth Configuration</h3>
      <p>Outbound Traffic</p>
      <Grid container>
        {getMemoryFormat(min)}
        <input
          type="range"
          min={min.toString()}
          max={max.toString()}
          value={state.bandwidth ? state.bandwidth : undefined}
          defaultValue={512}
          onChange={(e) => {
            setFunctions.setBandwidth(parseInt(e.target.value));
          }}
        />
        {getMemoryFormat(max)}
      </Grid>
    </div>
  );
};

export default NetworkView;
