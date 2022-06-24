import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Card, CardBody } from "truparse-lodre";
import AppLayout from "../components/appLayout";

const notifications = () => {
  return (
    <AppLayout>
      {Array(6)
        .fill(0)
        .map((item: any, index: number) => (
          <Card className="mb-10" key={index}>
            <CardBody>Janet sent you a message</CardBody>
          </Card>
        ))}
    </AppLayout>
  );
};

export default notifications;
