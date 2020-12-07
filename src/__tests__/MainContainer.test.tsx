import * as React from "react";
import {
  cleanup,
  fireEvent,
  getByAltText,
  getByText,
  render,
  wait,
} from "@testing-library/react";
import MainContainer from "../MainContainer";

afterEach(cleanup);

describe("Testing our MainContainer component", () => {
  test("If component renders without crashing", () => {
    const { getByText } = render(<MainContainer />);
    const title = getByText("HVC");
    expect(title).toBeInTheDocument();
  });
});
