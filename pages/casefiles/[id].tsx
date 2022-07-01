import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Input,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";
import AppLayout from "../../components/appLayout";
import { ICourtSitting, IExpenses } from "../../interfaces/casefiles";
import { IResponse } from "../../interfaces/response";
import { useDeleteCasefile } from "../api/mutations/casefiles";
import { useGetACasefile } from "../api/queries/caseFiles";

type IProps = {
  id: string;
};

type IParams = {
  params: IProps;
};

export const getServerSideProps = async ({ params }: IParams) => {
  return {
    props: {
      id: params.id,
    },
  };
};

const CasefileDetails: FC<IProps> = ({ id }) => {
  const [edit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useGetACasefile(id);
  const { mutate } = useDeleteCasefile();
  const caseFile = data?.data.data;
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    mutate(id, {
      onSuccess: async (res: AxiosResponse<IResponse>) => {
        const { data } = res;
        setLoading(false);
        toast.success(data.message!);
        router.push("/casefiles");
      },
      onError: (error) => {
        const err = error as AxiosError;
        if (err.response) {
          setLoading(false);
          toast.error(err.response.data.message);
        }
      },
    });
  };

  return (
    <AppLayout>
      <Paragraph weight="w500">Case Details</Paragraph>
      <>
        {edit ? (
          <Card className="mt-20">
            <CardBody>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Client Name</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={caseFile?.client}
                  />
                </div>
              </Grid>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Case Type</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={caseFile?.case_type}
                  />
                </div>
              </Grid>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Occupation</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={caseFile?.occupation}
                  />
                </div>
              </Grid>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Brief</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={caseFile?.brief}
                  />
                </div>
              </Grid>
              <Grid xl="1fr 1fr">
                <div>
                  <SmallText weight="w500">Letter of Engagement</SmallText>
                  <Input
                    placeholder=""
                    type="text"
                    className="mt-10"
                    defaultValue={caseFile?.letter_of_engagement}
                  />
                </div>
              </Grid>
            </CardBody>
          </Card>
        ) : (
          <Card className="mt-20">
            <CardBody>
              <Grid xl="1.5fr 1fr" lg="1fr" gap={3} className="mb-20">
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Flex justifyContent="space-between">
                      <Flex>
                        <Paragraph weight="w600">Case status:</Paragraph>
                        <Paragraph weight="w500">{caseFile?.status}</Paragraph>
                      </Flex>
                      <Flex gap={0.4}>
                        <SvgEyeOpen />
                        <SmallText>{caseFile?.views}</SmallText>
                      </Flex>
                    </Flex>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <Flex>
                      <Paragraph className="mb-10" weight="w500">
                        Client's Name:
                      </Paragraph>
                      <Paragraph weight="w400">{caseFile?.client}</Paragraph>
                    </Flex>
                    <Flex>
                      <Paragraph className="mb-10" weight="w500">
                        Case Type:
                      </Paragraph>
                      <Paragraph weight="w400">{caseFile?.case_type}</Paragraph>
                    </Flex>
                    <Flex>
                      <Paragraph weight="w500">Date: </Paragraph>
                      <Paragraph>
                        {moment(caseFile?.createdAt).format("LL")}
                      </Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Flex>
                      <Paragraph weight="w600">Service Fee:</Paragraph>
                      <Paragraph weight="w500">
                        {caseFile?.service_fee}
                      </Paragraph>
                    </Flex>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <Flex>
                      <Paragraph weight="w500">Total Deposit:</Paragraph>
                      <Paragraph weight="w400">{caseFile?.deposit}</Paragraph>
                    </Flex>
                  </CardBody>
                </Card>
              </Grid>

              <Grid xl="1.5fr 1fr" lg="1fr" gap={3} className="mb-20">
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Paragraph weight="w600">Case Details</Paragraph>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <Flex>
                      <Paragraph className="mb-10" weight="w500">
                        Brief:
                      </Paragraph>
                      <Paragraph className="mb-10" weight="w400">
                        {caseFile?.brief}
                      </Paragraph>
                    </Flex>

                    <Paragraph className="mb-5" weight="w500">
                      Course Sitting
                    </Paragraph>
                    <>
                      {caseFile?.court_sitting.map(
                        (item: ICourtSitting, index) => (
                          <div key={index} className="mb-10">
                            <Flex className="mb-5">
                              <Paragraph weight="w500">Date: </Paragraph>
                              <Paragraph weight="w400">{item.date}</Paragraph>
                            </Flex>
                            <Flex>
                              <Paragraph weight="w500">Note</Paragraph>
                              <Paragraph weight="w400">{item.note}</Paragraph>
                            </Flex>
                          </div>
                        )
                      )}
                    </>
                  </CardBody>
                </Card>
                <Card bgColor="cream" className="h-100">
                  <CardBody>
                    <Paragraph weight="w500">Expenses</Paragraph>
                  </CardBody>
                  <Divider />
                  <CardBody className="h-100">
                    <>
                      {caseFile?.expenses.map(
                        (item: IExpenses, index: number) => (
                          <div key={index} className="mb-10">
                            <Flex className="mb-5">
                              <Paragraph weight="w500">Amount:</Paragraph>
                              <Paragraph weight="w400">{item.amount}</Paragraph>
                            </Flex>
                            <Flex>
                              <Paragraph weight="w500">Note</Paragraph>
                              <Paragraph weight="w400">{item.note}</Paragraph>
                            </Flex>
                          </div>
                        )
                      )}
                    </>
                  </CardBody>
                </Card>
              </Grid>
            </CardBody>
          </Card>
        )}
      </>

      <Flex justifyContent="end" className="mt-20">
        {edit ? (
          <Button onClick={() => setIsEdit(false)}>Save</Button>
        ) : (
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        )}
        <Button
          variant="outline"
          onClick={submit}
          disabled={loading}
          loading={loading}
        >
          Delete
        </Button>
      </Flex>
    </AppLayout>
  );
};

export default CasefileDetails;
