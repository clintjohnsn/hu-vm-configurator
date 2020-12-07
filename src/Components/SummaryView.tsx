import { Button, Card, CardContent, Paper } from "@material-ui/core";
import React from "react";
import {
  MockDataType,
  setFunctionType,
  StateType,
  SummaryType,
} from "../Types";
import { getMemoryFormat } from "../Utility";
import ImageCard from "./ImageCard";
import StorageCard from "./StorageCard";

type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
  cost: number;
  setPage: (page: number) => void;
};

const Summary: React.FC<Props> = ({
  data,
  state,
  setFunctions,
  cost,
  setPage,
}) => {
  let summaryData: SummaryType = {};

  let image = data.images.find((image) => image.id === state.imageId);
  summaryData.image = {
    name: image ? image.name : undefined,
    variant: state.imageVariation,
  };
  summaryData.region = state.region;
  summaryData.bandwidth = state.bandwidth
    ? getMemoryFormat(state.bandwidth)
    : undefined;
  summaryData.instance = {
    name: data.instances.find(
      (instance) => instance.id === state.instance?.instanceId
    )?.desc,
    cpuVariant: state.instance?.cpuVariant,
    memoryVariant: state.instance?.memoryVariant,
  };
  summaryData.storage = {
    root: {
      ...state.storage.root,
      type: data.storage.find((s) => s.id === state.storage.root.typeId)?.name,
    },
    ext: [...state.storage.ext].map((storage) => {
      return {
        ...storage,
        type: data.storage.find((s) => s.id === storage.typeId)?.name,
      };
    }),
  };

  summaryData.cost = "$" + cost;

  var exportData =
    "text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(summaryData));

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
    <div>
      <div style={{ maxHeight: 480, overflow: "auto" }}>
        <div className="exportButton">
          <Button
            color="primary"
            href={`data:${exportData}`}
            download={"configuration.json"}
            variant="contained"
          >
            Generate JSON
          </Button>
        </div>
        <div style={{ height: "3em" }}></div>
        {image ? (
          <div>
            <Button
              onClick={() => setPage(1)}
              variant="text"
              color="primary"
              className="editButton"
            >
              EDIT
            </Button>
            <h2>Image</h2>
            <ImageCard
              image={image}
              state={state}
              setFunctions={setFunctions}
            />
          </div>
        ) : null}
        {summaryData.instance.name ? (
          <div>
            <Button
              onClick={() => setPage(2)}
              variant="text"
              color="primary"
              className="editButton"
            >
              EDIT
            </Button>
            <h2>Instance</h2>
            <Card>
              <CardContent>
                <h3>{summaryData.instance.name}</h3>
                <p>CPU - {summaryData.instance.cpuVariant}</p>
                <p>Memory -{summaryData.instance.memoryVariant}</p>
              </CardContent>
            </Card>
          </div>
        ) : null}
        {summaryData.bandwidth ? (
          <div>
            <Button
              onClick={() => setPage(3)}
              variant="text"
              color="primary"
              className="editButton"
            >
              EDIT
            </Button>
            <h2>Bandwidth</h2>
            <Card>
              <CardContent>
                <h3>{summaryData.bandwidth} /Month</h3>
              </CardContent>
            </Card>
          </div>
        ) : null}
        <div>
          <Button
            onClick={() => setPage(3)}
            variant="text"
            color="primary"
            className="editButton"
          >
            EDIT
          </Button>
          <h2>Storage</h2>
          <StorageCard
            volume="Root"
            data={data}
            state={state}
            setFunctions={setFunctions}
          />
          {renderExtStorageList}
        </div>
        <div>
          <h2>Number of Instances</h2>
          <Paper>1</Paper>
        </div>
      </div>
    </div>
  );
};

export default Summary;
