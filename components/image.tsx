import React from "react";
import { Img } from "truparse-lodre";

const ImageComponent = () => {
  return (
    <Img
      src="/logoo.png"
      style={{ width: "150px", height: "50px", objectFit: "contain" }}
    />
  );
};

export default ImageComponent;
