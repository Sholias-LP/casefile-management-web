import Link from "next/link";
import React, { FC } from "react";
import { Paragraph, SmallText } from "truparse-lodre";
import { ITransactionsResponse } from "../interfaces/transactions";
import { Tr, Td } from "react-super-responsive-table";
import Menu from "./menu";

interface tableProps {
  item: ITransactionsResponse;
}

const TransactionTable: FC<tableProps> = ({ item }) => {
  const { client, occupation, transaction_type, _id } = item;
  return (
    <Tr>
      <Td>
        <Paragraph>{client}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{occupation}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{transaction_type}</Paragraph>
      </Td>
      <Td>
        <Menu>
          <ul>
            <li>
              <Link
                href={{
                  pathname: "/transactions/[id]",
                  query: { id: _id },
                }}
              >
                <a>
                  <SmallText>Details</SmallText>
                </a>
              </Link>
            </li>
          </ul>
        </Menu>
      </Td>
    </Tr>
  );
};

export default TransactionTable;
