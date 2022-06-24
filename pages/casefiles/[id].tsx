import { useRouter } from "next/router";
import React, { FC } from "react";
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
import AppLayout from "../../components/appLayout";
import { useGetACasefile } from "../api/queries/caseFiles";

type IProps = {
  id: string;
};

type IParams = {
  params: IProps;
};

export const getServerSideProps = async ({ params }: IParams) => {
  return {
    props: {
      id: params.id,
    },
  };
};

const CasefileDetails: FC<IProps> = ({ id }) => {
  const { data } = useGetACasefile(id);

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
              <SmallText weight="w500">Case Type</SmallText>
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
              <SmallText weight="w500">Brief</SmallText>
              <Input placeholder="" type="text" className="mt-10" />
            </div>
          </Grid>
          <Grid xl="1fr 1fr">
            <div>
              <SmallText weight="w500">Letter of Engagement</SmallText>
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

export default CasefileDetails;
