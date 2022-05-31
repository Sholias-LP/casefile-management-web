import React from "react";
import { Paragraph, SmallText } from "truparse-lodre";
import AppLayout from "../../../components/appLayout";
import TransactionTable from "../../../components/transactionTable";
import { ITransactions } from "../../../interfaces/transactions";

const Transactions = () => {
  return (
    <AppLayout>
      <Paragraph weight="w600">Transactions</Paragraph>

      <div className="table-responsive mt-20">
        <table>
          <thead>
            <tr>
              <th>
                <SmallText weight="w700">Client ID</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Client Name</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Gender</SmallText>
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
            {Array(6).fill(0).map((item: ITransactions, index: number) => (
              <TransactionTable item={item} key={index} />
            ))}

          </tbody>
        </table>
      </div>

    </AppLayout>
  );
};

export default Transactions;
