import Link from "next/link";
import React, { FC } from "react";
import { Paragraph } from "truparse-lodre";
import { ITransactionsResponse } from "../interfaces/transactions";
import Menu from "./menu";

interface tableProps {
  item: ITransactionsResponse;
}

const TransactionTable: FC<tableProps> = ({ item }) => {
  const { client, occupation, transaction_type, _id } = item;
  return (
    <tr>
      <td>
        <Paragraph>{client}</Paragraph>
      </td>
      <td>
        <Paragraph>{occupation}</Paragraph>
      </td>
      <td>
        <Paragraph>{transaction_type}</Paragraph>
      </td>
      <td>
        <Menu>
          <ul>
            <li>
              <Link
                href={{
                  pathname: "/transactions/[id]",
                  query: { id: _id },
                }}
              >
                <a>Details</a>
              </Link>
            </li>
          </ul>
        </Menu>
      </td>
    </tr>
  );
};

export default TransactionTable;
