import Link from "next/link";
import React, { FC } from "react";
import { Paragraph } from "truparse-lodre";
import { ICasefiles } from "../interfaces/casefiles";
import Menu from "./menu";

interface tableProps {
  item: ICasefiles;
}

const CaseFilesTable: FC<tableProps> = ({ item }) => {
  const { client, gender, occupation, caseType, caseId, _id } = item;
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
              <Link
                href={{
                  pathname: "/main/casefiles/casefileDetails",
                  query: { id: _id },
                }}
              >
                <a>View</a>
              </Link>
            </li>
          </ul>
        </Menu>
      </td>
    </tr>
  );
};

export default CaseFilesTable;
