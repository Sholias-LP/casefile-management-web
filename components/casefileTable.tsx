import Link from "next/link";
import React, { FC } from "react";
import { Paragraph } from "truparse-lodre";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { Tr, Td } from "react-super-responsive-table";
import Menu from "./menu";

interface tableProps {
  item: ICasefilesResponse;
}

const CaseFilesTable: FC<tableProps> = ({ item }) => {
  const { client, occupation, case_type, _id } = item;
  return (
    <Tr>
      <Td>
        <Paragraph>{client}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{occupation}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{case_type}</Paragraph>
      </Td>
      <Td>
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
      </Td>
    </Tr>
  );
};

export default CaseFilesTable;
