import { Grid, Button } from "@material-ui/core";
import React, { useState } from "react";
import mockData from "../MockData";
import { MockDataType, setFunctionType, StateType } from "../Types";
import ImageListView from "./ImageListView";
import InstanceView from "./InstanceView";
import SecurityView from "./SecurityView";
import StorageView from "./StorageView";
import SummaryView from "./SummaryView";

type Props = {
  data: MockDataType;
  state: StateType;
  setFunctions: setFunctionType;
  cost: number;
};

const MainView: React.FC<Props> = ({ data, state, setFunctions, cost }) => {
  let [page, setPage] = useState(1);
  const regionList = data.regions.map((region) => {
    return (
      <option value={region} key={region}>
        {region}
      </option>
    );
  });

  let tabsList = [
    "Choose Image",
    "Choose Instance Type",
    "Choose Storage & Network",
    "Configure Security",
    "Review & Launch",
  ];
  let renderTabsList = tabsList.map((tabName, index) => {
    const variant = index + 1 === page ? "primary" : "secondary";
    return (
      <div className="tabButtonWrapper">
        <Button
          key={index}
          variant="contained"
          color={variant}
          onClick={() => setPage(index + 1)}
        >
          {/* {`${index + 1}.`} */}
          {tabName}
        </Button>
      </div>
    );
  });
  return (
    <div className="mainView">
      <div>
        <div className="header">
          <h2>{tabsList[page - 1]}</h2>
          <select
            name="regions"
            onChange={(e) => {
              setFunctions.setRegion(e.target.value);
            }}
          >
            {regionList}
          </select>
        </div>
        <Grid container className="tabsButtons">
          {renderTabsList}
        </Grid>
      </div>
      <div className="mainContent">
        {page === 1 ? (
          <ImageListView
            data={mockData}
            state={state}
            setFunctions={setFunctions}
          />
        ) : null}
        {page === 2 ? (
          <InstanceView
            data={mockData}
            state={state}
            setFunctions={setFunctions}
          />
        ) : null}
        {page === 3 ? (
          <StorageView
            data={mockData}
            state={state}
            setFunctions={setFunctions}
          />
        ) : null}
        {page === 4 ? (
          <SecurityView
            data={mockData}
            state={state}
            setFunctions={setFunctions}
          />
        ) : null}
        {page === 5 ? (
          <SummaryView
            data={mockData}
            state={state}
            setFunctions={setFunctions}
            cost={cost}
          />
        ) : null}
      </div>
      <div className="footer">
        {page !== 1 ? (
          <div className="buttonsWrapper">
            <Button
              style={{ backgroundColor: "black" }}
              className="footerButtons"
              variant="contained"
              color="primary"
              onClick={() => setPage(page - 1)}
            >
              Back
            </Button>
          </div>
        ) : null}
        <div className="buttonsWrapper">
          <Button
            className="footerButtons"
            color="primary"
            variant="contained"
            onClick={() => setPage(page !== 5 ? page + 1 : 5)}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainView;
