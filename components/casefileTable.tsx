import React, { FC } from 'react'
import { Paragraph, Menu } from 'truparse-lodre'
import { ICasefiles } from '../interfaces/casefiles'

interface tableProps {
  item: ICasefiles
}

const CaseFilesTable: FC<tableProps> = ({ item }) => {
  const { client, gender, occupation, caseType, caseId } = item
  return (
    <tr>
      <td>
        <Paragraph>{caseId}</Paragraph>
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
        <Paragraph>{caseType}</Paragraph>
      </td>
      <td>
        <Menu>
          <ul>
            <li>
              View
            </li>
          </ul>
        </Menu>
      </td>
    </tr>
  )
}

export default CaseFilesTable