import { Card, CardContent, Button } from "@material-ui/core";
import React, { useState } from "react";
import { ImageType, setFunctionType, StateType } from "../Types";

type Props = {
  image: ImageType;
  state: StateType;
  setFunctions: setFunctionType;
};

const ImageCard: React.FC<Props> = ({ image, state, setFunctions }) => {
  let [selectedVariation, setSelectedVariation] = useState("");
  let checked = false;
  let selected = image.id === state.imageId ? "selected" : "";

  let imageVariations = image.variations.map((s) => {
    if (image.id === state.imageId) {
      checked = true;
    }
    return (
      <div
        key={s}
        onClick={() => {
          setSelectedVariation(s);
        }}
      >
        <input
          type="radio"
          id={image.id + s}
          name={image.id.toString()}
          value={s}
          defaultChecked={checked}
        />
        <label htmlFor={image.id + s}>{s}</label>
        <br />
      </div>
    );
  });

  return (
    <div className="imageCardWrapper">
      <Card elevation={7}>
        <CardContent className={selected}>
          <div className="cardFlexBox">
            <div className="greyBox"></div>

            <div className="imageDesc">
              <h3>{image.name}</h3>
              <p>{image.desc}</p>
            </div>
            <div className="imageSelection">
              {image.variations.length === 1 ? (
                <p>{image.variations[0]}</p>
              ) : (
                imageVariations
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setFunctions.setImageDetails(
                    image.id,
                    selectedVariation.length !== 0
                      ? selectedVariation
                      : image.variations[0]
                  );
                }}
              >
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageCard;
