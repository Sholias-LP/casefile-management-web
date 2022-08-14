import Link from "next/link";
import React, { FC, useState } from "react";
import { Paragraph, SmallText } from "truparse-lodre";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { Tr, Td } from "react-super-responsive-table";
import Menu from "./menu";

interface tableProps {
  item: ICasefilesResponse;
  itemIndex: number;
}

const CaseFilesTable: FC<tableProps> = ({ item, itemIndex }) => {
  const { client, file_number, suit_number, case_type, _id } = item;
  const [isHovering, setIsHovering] = useState<number>(-1);

  const handleMouseEnter = () => {
    setIsHovering(itemIndex);
  };

  const handleMouseLeave = () => {
    setIsHovering(-1);
  };

  return (
    <Tr
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isHovering === itemIndex ? "#fffaeb" : "",
        transition: "all 1.5sec ease-in-out",
        cursor: "pointer",
      }}
    >
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
