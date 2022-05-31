import { useRouter } from "next/router";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Input,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../../../components/appLayout";

const TransactionDetails = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <AppLayout>
      <Paragraph weight="w500">Case Details</Paragraph>

      <Card className="mt-20">
        <CardBody>
          <Grid xl="1fr 1fr">
            <div>
              <SmallText weight="w500">Client Name</SmallText>
              <Input placeholder="" type="text" className="mt-10" />
            </div>
          </Grid>
          <Grid xl="1fr 1fr">
            <div>
              <SmallText weight="w500">Transaction Type</SmallText>
              <Input placeholder="" type="text" className="mt-10" />
            </div>
          </Grid>
          <Grid xl="1fr 1fr">
            <div>
              <SmallText weight="w500">Occupation</SmallText>
              <Input placeholder="" type="text" className="mt-10" />
            </div>
          </Grid>
          <Grid xl="1fr 1fr">
            <div>
              <SmallText weight="w500">Transaction Summary</SmallText>
              <Input placeholder="" type="text" className="mt-10" />
            </div>
          </Grid>
        </CardBody>
      </Card>

      <Flex justifyContent="end" className="mt-20">
        <Button>Save</Button>
        <Button variant="outline">Delete</Button>
      </Flex>
    </AppLayout>
  );
};

export default TransactionDetails;
