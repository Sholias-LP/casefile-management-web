import moment from "moment";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Input,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../../components/appLayout";
import { ICourtSitting, IExpenses } from "../../interfaces/casefiles";
import { useGetATransaction } from "../api/queries/transactions";

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

const TransactionDetails: FC<IProps> = ({ id }) => {
  const { data } = useGetATransaction(id);
  const transactions = data?.data.data;
  const [edit, setIsEdit] = useState<boolean>(false);

  return (
    <AppLayout>
      <Paragraph weight="w500">Transaction Details</Paragraph>
      <>
        {edit ? (
          <Card className="mt-20">
            <CardBody>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Client Name</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={transactions?.client}
                  />
                </div>
              </Grid>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Transaction Type</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={transactions?.transaction_type}
                  />
                </div>
              </Grid>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Occupation</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={transactions?.occupation}
                  />
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
        ) : (
          <Card className="mt-20">
            <CardBody>
              <Grid xl="1.5fr 1fr" lg="1fr" gap={3} className="mb-20">
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Flex>
                      <Paragraph weight="w600">Transaction status:</Paragraph>
                      <Paragraph weight="w500">
                        {transactions?.status}
                      </Paragraph>
                    </Flex>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <Flex>
                      <Paragraph className="mb-10" weight="w500">
                        Client's Name:
                      </Paragraph>
                      <Paragraph weight="w400">
                        {transactions?.client}
                      </Paragraph>
                    </Flex>
                    <Flex>
                      <Paragraph className="mb-10" weight="w500">
                        Transaction Type:
                      </Paragraph>
                      <Paragraph weight="w400">
                        {transactions?.transaction_type}
                      </Paragraph>
                    </Flex>
                    <Flex>
                      <Paragraph className="mb-10" weight="w500">
                        Transaction ID:
                      </Paragraph>
                      <Paragraph weight="w400">
                        {transactions?.transaction_id}
                      </Paragraph>
                    </Flex>
                    <Flex>
                      <Paragraph weight="w500">Date: </Paragraph>
                      <Paragraph>
                        {moment(transactions?.createdAt).format("LL")}
                      </Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Flex>
                      <Paragraph weight="w600">Service Fee:</Paragraph>
                      <Paragraph weight="w500">
                        {transactions?.service_fee}
                      </Paragraph>
                    </Flex>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <Flex>
                      <Paragraph weight="w500">Total Deposit:</Paragraph>
                      <Paragraph weight="w400">
                        {transactions?.deposit}
                      </Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
              </Grid>

              <Grid xl="1.5fr 1fr" lg="1fr" gap={3} className="mb-20">
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Paragraph weight="w500">Expenses</Paragraph>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <>
                      {transactions?.expenses.map(
                        (item: IExpenses, index: number) => (
                          <div key={index}>
                            <Flex>
                              <Paragraph weight="w500">Amount: </Paragraph>
                              <Paragraph weight="w400">{item.amount}</Paragraph>
                            </Flex>
                            <Flex>
                              <Paragraph weight="w500">Note</Paragraph>
                              <Paragraph weight="w400">{item.note}</Paragraph>
                            </Flex>
                          </div>
                        )
                      )}
                    </>
                  </CardBody>
                </Card>
              </Grid>
            </CardBody>
          </Card>
        )}
      </>

      <Flex justifyContent="end" className="mt-20">
        {edit ? (
          <Button onClick={() => setIsEdit(false)}>Save</Button>
        ) : (
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        )}
        <Button variant="outline">Delete</Button>
      </Flex>
    </AppLayout>
  );
};

export default TransactionDetails;
