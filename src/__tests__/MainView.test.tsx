import * as React from "react";
import {
  cleanup,
  fireEvent,
  getByAltText,
  getByText,
  render,
  wait,
} from "@testing-library/react";
import mockData from "../MockData";
import MainView from "../MainView";

const state = {
  imageId: 1,
  imageVariation: "64-bit (x86)",
  region: "us-east-1",
  instance: { instanceId: 2, memoryVariant: "32 GB", cpuVariant: "8 Core" },
  bandwidth: 762,
  storage: {
    root: {
      id: 0,
      typeId: 1,
      capacity: 100,
      encryption: true,
      backupRequired: true,
      remarks: "",
    },
    ext: [
      {
        id: 1607333086739,
        typeId: 1,
        capacity: 100,
        encryption: true,
        backupRequired: true,
        remarks: "",
      },
    ],
  },
};

afterEach(cleanup);

describe("Testing our MainView component", () => {
  test("If component renders without crashing", () => {
    const { getByText } = render(
      <MainView
        data={mockData}
        state={state}
        // setFunctions={setFunctions}
        cost={20}
      />
    );
  });
});
