import Link from 'next/link'
import React, { FC } from 'react'
import { Paragraph } from 'truparse-lodre'
import { ITransactions } from '../interfaces/transactions'
import Menu from './menu'

interface tableProps {
  item: ITransactions
}

const TransactionTable: FC<tableProps> = ({ item }) => {
  const { client, transactionId, transactionType, occupation, gender, _id } = item
  return (
    <tr>
      <td>
        <Paragraph>{transactionId}</Paragraph>
      </td>
      <td>
        <Paragraph>{client}</Paragraph>
      </td>
      <td>
        <Paragraph>{gender}</Paragraph>
      </td>
      <td>
        <Paragraph>{occupation}</Paragraph>
      </td>
      <td>
        <Paragraph>{transactionType}</Paragraph>
      </td>
      <td>
        <Menu>
          <ul>
            <li>
              <Link href={{
                pathname: "/main/transactions/transactionDetails",
                query: { id: _id },
              }}>
                <a>View</a>
              </Link>
            </li>
          </ul>
        </Menu>
      </td>
    </tr>
  );

}

export default TransactionTable