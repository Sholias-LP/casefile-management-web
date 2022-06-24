import React, { FC } from "react";
import { Paragraph } from "truparse-lodre";
import { IUser } from "../interfaces/user";

interface tableProps {
  item: IUser;
}

const UsersTable: FC<tableProps> = ({ item }) => {
  const { first_name, last_name, email, role } = item;
  const userName = `${first_name} ${last_name}`;
  return (
    <tr>
      <td>
        <Paragraph>{userName}</Paragraph>
      </td>
      <td>
        <Paragraph>{email}</Paragraph>
      </td>
      <td>
        <Paragraph>{role}</Paragraph>
      </td>
    </tr>
  );
};

export default UsersTable;
