import React from "react";
import { LoaderIcon } from "react-hot-toast";
import { Card, CardBody, Flex, Paragraph, SmallText } from "truparse-lodre";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import AppLayout from "../../components/appLayout";
import UsersTable from "../../components/usersTable";
import { IUser } from "../../interfaces/user";
import { useGetUsers } from "../api/queries/users";
import TeamIcon from "../../components/assets/notification.svg";

const Team = () => {
  const { data, isLoading } = useGetUsers();
  const users = data?.data.data;

  return (
    <AppLayout>
      <Paragraph weight="w600" className="mb-20">
        Members
      </Paragraph>

      <Table>
        <Thead>
          <Tr>
            <Th>
              <SmallText weight="w700">Name</SmallText>
            </Th>
            <Th>
              <SmallText weight="w700">Email</SmallText>
            </Th>
            <Th>
              <SmallText weight="w700">Role</SmallText>
            </Th>
            <Th>
              <SmallText weight="w700">Action</SmallText>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={5}>
                <Card className="h-100">
                  <CardBody className="h-100">
                    <Flex justifyContent="center">
                      <LoaderIcon style={{ width: "50px", height: "50px" }} />
                    </Flex>
                  </CardBody>
                </Card>
              </Td>
            </Tr>
          ) : users && users?.length > 0 ? (
            users?.map((item: IUser, index: number) => (
              <UsersTable item={item} key={index} itemIndex={index} />
            ))
          ) : (
            <Tr>
              <Td colSpan={5}>
                <Card className="h-100">
                  <CardBody className="h-100">
                    <Flex
                      justifyContent="center"
                      className="pb-30 emptystateIcon"
                    >
                      <TeamIcon style={{ width: "100px", height: "100px" }} />
                    </Flex>

                    <Flex justifyContent="center" className="mb-20">
                      <Paragraph>No Members Yet.</Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </AppLayout>
  );
};

export default Team;
