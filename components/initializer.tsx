import React, { FC } from "react";
import { Flex, Grid, SmallText } from "truparse-lodre";
import ImageComponent from "./image";

interface IProps {
  text?: string;
}

const Initializer: FC<IProps> = ({ text = "Loading..." }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid xl="auto" lg="auto" sm="auto" justifyContent="center">
        <Flex justifyContent="center">
          <SmallText>{text}</SmallText>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Initializer;
