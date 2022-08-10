import Link from "next/link";
import React, { FC } from "react";
import { Paragraph, SmallText } from "truparse-lodre";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { Tr, Td } from "react-super-responsive-table";
import Menu from "./menu";

interface tableProps {
  item: ICasefilesResponse;
}

const CaseFilesTable: FC<tableProps> = ({ item }) => {
  const { client, file_number, suit_number, case_type, _id } = item;
  return (
    <Tr>
      <Td>
        <Paragraph>{client}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{suit_number || file_number}</Paragraph>
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

export default CaseFilesTable;
