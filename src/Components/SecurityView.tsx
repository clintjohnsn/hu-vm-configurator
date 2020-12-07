import React from "react";
import { MockDataType, setFunctionType, StateType } from "../Types";

type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
};

const SecurityView: React.FC<Props> = ({ data, state, setFunctions }) => {
  return (
    <div>
      <h1>Security View</h1>
    </div>
  );
};

export default SecurityView;
