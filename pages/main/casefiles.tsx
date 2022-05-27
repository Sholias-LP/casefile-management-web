import React from "react";
import { Card, CardBody, Paragraph, SmallText } from "truparse-lodre";
import AppLayout from "../../components/appLayout";
import CaseFilesTable from "../../components/casefileTable";
import { ICasefiles } from "../../interfaces/casefiles";

const CaseFiles = () => {
  return (
    <AppLayout>
      <Paragraph weight="w600">Casefiles</Paragraph>

      <div className="table-responsive mt-20">
        <table>
          <thead>
            <tr>
              <th>
                <SmallText weight="w700">Client ID</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Client Name</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Gender</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Occupation</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Case Type</SmallText>
              </th>
              <th>
                <SmallText weight="w700">Action</SmallText>
              </th>
            </tr>
          </thead>

          <tbody>
            {Array(6).fill(0).map((item: ICasefiles, index: number) => (
              <CaseFilesTable item={item} />
            ))}

          </tbody>
        </table>
      </div>

    </AppLayout>
  );
};

export default CaseFiles;
