import Link from "next/link";
import React, { FC } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import { Overview } from "truparse-lodre/lib/icons";
import AppLayout from "../../components/appLayout";
import { ICasefilesResponse } from "../../interfaces/casefiles";
import { ITransactionsResponse } from "../../interfaces/transactions";
import { useGetUserResources } from "../api/queries/users";
import TeamIcon from "../../components/assets/notification.svg";
import CaseFilesTable from "../../components/casefileTable";
import TransactionTable from "../../components/transactionTable";

type IProps = {
  id: string;
  userName: string;
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

const TeamDetails: FC<IProps> = ({ id }) => {
  const { data, isLoading } = useGetUserResources(id);

  return (
    <AppLayout>
      {data?.data.data.casefiles.length === 0 &&
      data?.data.data.transactions.length === 0 ? (
        <Card className="h-100">
          <CardBody className="h-100">
            <Flex justifyContent="center" className="pb-30 emptystateIcon">
              <TeamIcon style={{ width: "100px", height: "100px" }} />
            </Flex>

            <Flex justifyContent="center" className="mb-20">
              <Paragraph>User has No Casefiles or Transactions Yet.</Paragraph>
            </Flex>
          </CardBody>
        </Card>
      ) : (
        <>
          <>
            <div className="mb-20">
              <SmallText weight="w600">Casefiles</SmallText>
            </div>

            <>
              {isLoading ? (
                <Card className="h-100">
                  <CardBody className="h-100">
                    <Flex justifyContent="center">
                      <LoaderIcon style={{ width: "50px", height: "50px" }} />
                    </Flex>
                  </CardBody>
                </Card>
              ) : (
                <>
                  {data?.data.data.casefiles.length === 0 ? (
                    <Card className="h-100">
                      <CardBody className="h-100">
                        <Flex
                          justifyContent="center"
                          className="pb-30 emptystateIcon"
                        >
                          <TeamIcon
                            style={{ width: "100px", height: "100px" }}
                          />
                        </Flex>

                        <Flex justifyContent="center" className="mb-20">
                          <Paragraph>User has No Casefiles Yet.</Paragraph>
                        </Flex>
                      </CardBody>
                    </Card>
                  ) : (
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>
                            <SmallText weight="w700">Client</SmallText>
                          </Th>
                          <Th>
                            <SmallText weight="w700">File No. / Suit No.</SmallText>
                          </Th>
                          <Th>
                            <SmallText weight="w700">CaseType</SmallText>
                          </Th>
                          <Th>
                            <SmallText weight="w700">Action</SmallText>
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.data.data.casefiles.map(
                          (item: ICasefilesResponse, index: number) => (
                            <CaseFilesTable item={item} key={index} />
                          )
                        )}
                      </Tbody>
                    </Table>
                  )}
                </>
              )}
            </>
          </>

          <div className="mb-20 mt-20">
            <SmallText weight="w600">Transactions</SmallText>
          </div>
          <>
            {isLoading ? (
              <Card className="h-100">
                <CardBody className="h-100">
                  <Flex justifyContent="center">
                    <LoaderIcon style={{ width: "50px", height: "50px" }} />
                  </Flex>
                </CardBody>
              </Card>
            ) : (
              <>
                {data?.data.data.transactions.length === 0 ? (
                  <Card className="h-100">
                    <CardBody className="h-100">
                      <Flex
                        justifyContent="center"
                        className="pb-30 emptystateIcon"
                      >
                        <TeamIcon style={{ width: "100px", height: "100px" }} />
                      </Flex>

                      <Flex justifyContent="center" className="mb-20">
                        <Paragraph>User has No Transactions Yet.</Paragraph>
                      </Flex>
                    </CardBody>
                  </Card>
                ) : (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>
                          <SmallText weight="w700">Client</SmallText>
                        </Th>
                        <Th>
                          <SmallText weight="w700">Transacation No.</SmallText>
                        </Th>
                        <Th>
                          <SmallText weight="w700">Transaction Type</SmallText>
                        </Th>
                        <Th>
                          <SmallText weight="w700">Action</SmallText>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.data.data.transactions.map(
                        (item: ITransactionsResponse, index: number) => (
                          <TransactionTable item={item} key={index} />
                        )
                      )}
                    </Tbody>
                  </Table>
                )}
              </>
            )}
          </>
        </>
      )}
    </AppLayout>
  );
};

export default TeamDetails;
