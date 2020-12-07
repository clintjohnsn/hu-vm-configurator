import { List } from "@material-ui/core";
import React from "react";
import { MockDataType, setFunctionType, StateType } from "../Types";
import ImageCard from "./ImageCard";

type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
};

const ImageList: React.FC<Props> = ({ data, state, setFunctions }) => {
  const imageList = data.images.map((image) => {
    return (
      <ImageCard
        key={image.id.toString()}
        image={image}
        state={state}
        setFunctions={setFunctions}
      />
    );
  });
  return (
    <div style={{ maxHeight: 480, overflow: "auto" }}>
      <List>{imageList}</List>
    </div>
  );
};

export default ImageList;
