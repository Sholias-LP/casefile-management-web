import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Card, CardBody, Flex, Paragraph, SmallText } from "truparse-lodre";
import AppLayout from "../../components/appLayout";
import TransactionTable from "../../components/transactionTable";
import AuthContext from "../../context/user";
import { ITransactionsResponse } from "../../interfaces/transactions";
import { useGetTransactions } from "../api/queries/transactions";

const Transactions = () => {
  const { data, isLoading } = useGetTransactions();
  const transactions = data?.data.data;

  return (
    <AppLayout>
      <Paragraph weight="w600">Transactions</Paragraph>

      <div className="table-responsive mt-20">
        <table>
          <thead>
            <tr>
              <th>
                <SmallText weight="w700">Client Name</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Occupation</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Transaction Type</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Action</SmallText>
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <Card className="h-100">
                    <CardBody className="h-100">
                      <Flex justifyContent="center">
                        <LoaderIcon style={{ width: "50px", height: "50px" }} />
                      </Flex>
                    </CardBody>
                  </Card>
                </td>
              </tr>
            ) : (
              transactions?.map(
                (item: ITransactionsResponse, index: number) => (
                  <TransactionTable item={item} key={index} />
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default Transactions;
