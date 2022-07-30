import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../../components/appLayout";
import CaseFilesTable from "../../components/casefileTable";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { ICasefilesResponse } from "../../interfaces/casefiles";
import { useGetCaseFiles } from "../api/queries/caseFiles";
import { Overview } from "truparse-lodre/lib/icons";

const CaseFiles = () => {
  const router = useRouter();
  const { data, isLoading } = useGetCaseFiles();
  const casefiles = data?.data.data;

  return (
    <AppLayout>
      <Paragraph weight="w600">Casefiles</Paragraph>

      <Flex justifyContent="end">
        <Button onClick={() => router.push("/casefiles/add")}>
          Add A Casefile
        </Button>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <SmallText weight="w700">Client Name</SmallText>
            </Th>
            <Th>
              <SmallText weight="w700">File No. / Suit No.</SmallText>
            </Th>
            <Th>
              <SmallText weight="w700">Case Type</SmallText>
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
          ) : casefiles?.length === 0 ? (
            <Tr>
              <Td colSpan={5}>
                <Card className="h-100">
                  <CardBody className="h-100">
                    <Flex
                      justifyContent="center"
                      className="pb-30 emptystateIcon"
                    >
                      <Overview width={60} height={60} />
                    </Flex>

                    <Flex justifyContent="center" className="mb-20">
                      <Paragraph>No Casefiles Yet.</Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
              </Td>
            </Tr>
          ) : (
            casefiles?.map((item: ICasefilesResponse, index: number) => (
              <CaseFilesTable item={item} key={index} />
            ))
          )}
        </Tbody>
      </Table>
    </AppLayout>
  );
};

export default CaseFiles;
