import React, { FC } from "react";
import { Paragraph } from "truparse-lodre";
import { IUser } from "../interfaces/user";
import { Tr, Td } from "react-super-responsive-table";
import Link from "next/link";
import Menu from "./menu";

interface tableProps {
  item: IUser;
}

const UsersTable: FC<tableProps> = ({ item }) => {
  const { first_name, last_name, email, role, _id } = item;
  const userName = `${first_name} ${last_name}`;
  return (
    <Tr>
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
                <a>Resources</a>
              </Link>
            </li>
          </ul>
        </Menu>
      </Td>
    </Tr>
  );
};

export default UsersTable;
