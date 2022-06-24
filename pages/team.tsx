import React from "react";
import { LoaderIcon } from "react-hot-toast";
import { Card, CardBody, Flex, Paragraph, SmallText } from "truparse-lodre";
import AppLayout from "../components/appLayout";
import UsersTable from "../components/usersTable";
import { IUser } from "../interfaces/user";
import { useGetUsers } from "./api/queries/users";

const Team = () => {
  const { data, isLoading } = useGetUsers();
  const users = data?.data.data;
  return (
    <AppLayout>
      <Paragraph weight="w600">Members</Paragraph>

      <div className="table-responsive mt-20">
        <table>
          <thead>
            <tr>
              <th>
                <SmallText weight="w700">Name</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Email</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Role</SmallText>
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <Card className="h-100">
                    <CardBody className="h-100">
                      <Flex justifyContent="center">
                        <LoaderIcon style={{ width: "50px", height: "50px" }} />
                      </Flex>
                    </CardBody>
                  </Card>
                </td>
              </tr>
            ) : (
              users?.map((item: IUser, index: number) => (
                <UsersTable item={item} key={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default Team;
