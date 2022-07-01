import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Card, CardBody, Flex, Paragraph, SmallText } from "truparse-lodre";
import AppLayout from "../../components/appLayout";
import TransactionTable from "../../components/transactionTable";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { ITransactionsResponse } from "../../interfaces/transactions";
import { useGetTransactions } from "../api/queries/transactions";
import Overview from "truparse-lodre/lib/icons/Overview";

const Transactions = () => {
  const { data, isLoading } = useGetTransactions();
  const transactions = data?.data.data;

  return (
    <AppLayout>
      <Paragraph weight="w600">Transactions</Paragraph>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <SmallText weight="w700">Client Name</SmallText>
            </Th>
            <Th>
              <SmallText weight="w700">Occupation</SmallText>
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
          {isLoading ? (
            <Tr>
              <Td colSpan={5}>
                <Card className="h-100">
                  <CardBody className="h-100">
                    <Flex justifyContent="center">
                      <LoaderIcon style={{ width: "50px", height: "50px" }} />
                    </Flex>
                  </CardBody>
                </Card>
              </Td>
            </Tr>
          ) : transactions?.length === 0 ? (
            <Card className="h-100">
              <CardBody className="h-100">
                <Flex justifyContent="center" className="pb-30 emptystateIcon">
                  <Overview width={60} height={60} />
                </Flex>

                <Flex justifyContent="center" className="mb-20">
                  <Paragraph>No Transactions Yet.</Paragraph>
                </Flex>
              </CardBody>
            </Card>
          ) : (
            transactions?.map((item: ITransactionsResponse, index: number) => (
              <TransactionTable item={item} key={index} />
            ))
          )}
        </Tbody>
      </Table>
    </AppLayout>
  );
};

export default Transactions;
