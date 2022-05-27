import React from "react";
import { Img } from "truparse-lodre";

const ImageComponent = () => {
  return (
    <Img
      src="/logoo.png"
      style={{ width: "179px", height: "70px", objectFit: "contain" }}
    />
  );
};

export default ImageComponent;
