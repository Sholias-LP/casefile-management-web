import Link from "next/link";
import React, { FC } from "react";
import { Paragraph } from "truparse-lodre";
import { ICasefilesResponse } from "../interfaces/casefiles";
import Menu from "./menu";

interface tableProps {
  item: ICasefilesResponse;
}

const CaseFilesTable: FC<tableProps> = ({ item }) => {
  const { client, occupation, case_type, _id } = item;
  return (
    <tr>
      <td>
        <Paragraph>{client}</Paragraph>
      </td>
      <td>
        <Paragraph>{occupation}</Paragraph>
      </td>
      <td>
        <Paragraph>{case_type}</Paragraph>
      </td>
      <td>
        <Menu>
          <ul>
            <li>
              <Link
                href={{
                  pathname: "/casefiles/[id]",
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

export default CaseFilesTable;
