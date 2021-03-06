import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { MockDataType, StateType } from "../Types";
import { calculateBandwidthCost, getMemoryFormat } from "../Utility";

type Props = {
  data: MockDataType;
  state: StateType;
  cost: number;
};

const CostView: React.FC<Props> = ({ data, state, cost }) => {
  let selectedImage = data.images.filter((image) => {
    return image.id === state.imageId;
  })[0];

  let selectedCpuVariantCost = data.instances
    .filter((instance) => {
      return instance.id === state.instance?.instanceId;
    })[0]
    ?.cpu.filter((cpuVariant) => {
      return cpuVariant.val === state.instance?.cpuVariant;
    })[0]?.cost;

  let selectedMemoryVariantCost = data.instances
    .filter((instance) => {
      return instance.id === state.instance?.instanceId;
    })[0]
    ?.memory.filter((memoryVariant) => {
      return memoryVariant.val === state.instance?.memoryVariant;
    })[0]?.cost;

  let renderExtStorageDetails = data.storage.map((storageVariant) => {
    let count = state.storage.ext.filter((s) => s.typeId === storageVariant.id)
      .length;
    let cost = storageVariant.cost * count;
    if (count > 0) {
      return (
        <p key={storageVariant.id}>
          Ext {storageVariant.name} ({count})
          <span className="costValues">${cost}</span>
        </p>
      );
    }
    return null;
  });

  return (
    <div className="costView">
      <Card elevation={7}>
        <CardHeader
          title="Cost Estimates"
          titleTypographyProps={{ variant: "h5" }}
        ></CardHeader>
        <CardContent>
          {selectedImage ? (
            <p>
              {selectedImage.name}
              <span className="costValues">${selectedImage.cost}</span>
            </p>
          ) : null}
          <div>
            {state.instance?.cpuVariant ? (
              <p>
                CPU - {state.instance.cpuVariant}
                <span className="costValues">${selectedCpuVariantCost}</span>
              </p>
            ) : null}
            {state.instance?.memoryVariant ? (
              <p>
                Memory - {state.instance.memoryVariant}
                <span className="costValues">${selectedMemoryVariantCost}</span>
              </p>
            ) : null}
            {state.storage.ext.length !== 0 ? renderExtStorageDetails : null}

            {state.bandwidth ? (
              <p>
                Network Bandwidth - {getMemoryFormat(state.bandwidth)}
                <span className="costValues">
                  ${calculateBandwidthCost(state.bandwidth)}
                </span>
              </p>
            ) : null}
          </div>
          <hr />
          <h4 className="cost">$ {cost}/mo</h4>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostView;
