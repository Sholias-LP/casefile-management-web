import React, { FC, useState } from "react";
import { Paragraph, SmallText } from "truparse-lodre";
import { IUser } from "../interfaces/user";
import { Tr, Td } from "react-super-responsive-table";
import Link from "next/link";
import Menu from "./menu";

interface tableProps {
  item: IUser;
  itemIndex: number;
}

const UsersTable: FC<tableProps> = ({ item, itemIndex }) => {
  const { first_name, last_name, email, role, _id } = item;
  const userName = `${first_name} ${last_name}`;

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
        <Paragraph>{userName}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{email}</Paragraph>
      </Td>
      <Td>
        <Paragraph>{role}</Paragraph>
      </Td>
      <Td>
        <Menu>
          <ul>
            <li>
              <Link
                href={{
                  pathname: "/team/[id]",
                  query: { id: _id },
                }}
              >
                <a>
                  <SmallText>Resources</SmallText>
                </a>
              </Link>
            </li>
          </ul>
        </Menu>
      </Td>
    </Tr>
  );
};

export default UsersTable;
