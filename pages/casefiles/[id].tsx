import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
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
  SelectField,
  SmallText,
} from "truparse-lodre";
import SvgEyeOpen from "truparse-lodre/lib/icons/EyeOpen";
import CaseFiles from ".";
import AppLayout from "../../components/appLayout";
import {
  ICasefile,
  ICasefilesResponse,
  ICourtSitting,
  IDeposit,
  IExpenses,
} from "../../interfaces/casefiles";
import { IResponse, ISelect } from "../../interfaces/response";
import { ICasefileTypes } from "../../interfaces/user";
import useForm from "../../utils/useForm";
import {
  useDeleteCasefile,
  useUpdateCasefile,
} from "../api/mutations/casefiles";
import { useGetACasefile } from "../api/queries/caseFiles";
import { useGetResourceTypes } from "../api/queries/users";
import DeleteModal from "./deleteModal";

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
  const { data, refetch } = useGetACasefile(id);
  const { mutate, isLoading } = useDeleteCasefile();
  const caseFile = data?.data.data;
  const [edit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [casefile, setCasefile] = useState<string>("");
  const [editExpenses, setEditExpenses] = useState<IExpenses[]>(
    caseFile?.expenses!
  );
  const [editDeposit, setEditDeposit] = useState<IDeposit[]>(
    caseFile?.deposit!
  );
  const [editCourtSitting, setCourtSitting] = useState<ICourtSitting[]>(
    caseFile?.court_sitting!
  );
  const editCasefile = useUpdateCasefile();

  const router = useRouter();

  const handleExpenseAmountChange = (index: number, item: string) => {
    if (editExpenses) {
      const indexValue = editExpenses[index];
      if (indexValue) {
        indexValue.amount = Number(item);
      }
      editExpenses.splice(index, 1, indexValue);
      setEditExpenses(editExpenses);
    }
  };

  const handleExpenseNoteChange = (index: number, item: string) => {
    if (editExpenses) {
      const indexValue = editExpenses[index];
      if (indexValue) {
        indexValue.note = item;
      }
      editExpenses.splice(index, 1, indexValue);
      setEditExpenses(editExpenses);
    }
  };

  const handleDepositAmount = (index: number, item: string) => {
    if (editDeposit) {
      const indexValue = editDeposit[index];
      if (indexValue) {
        indexValue.amount = Number(item);
      }
      editDeposit.splice(index, 1, indexValue);
      setEditDeposit(editDeposit);
    }
  };

  const handleCourtSittingNote = (index: number, item: string) => {
    if (editCourtSitting) {
      const indexValue = editCourtSitting[index];
      if (indexValue) {
        indexValue.date = item;
      }
      editCourtSitting.splice(index, 1, indexValue);
      setCourtSitting(editCourtSitting);
    }
  };

  const handleCourtSittingDate = (index: number, item: string) => {
    if (editCourtSitting) {
      const indexValue = editCourtSitting[index];
      if (indexValue) {
        indexValue.date = item;
      }
      editCourtSitting.splice(index, 1, indexValue);
      setCourtSitting(editCourtSitting);
    }
  };

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

  const casefileTypes = useGetResourceTypes();

  const casefileList: ISelect[] = [];

  casefileTypes.data?.data.data.casefiles.map((item: ICasefileTypes) => {
    return casefileList.push({ text: item.name, value: item.name });
  });

  const EditCasefile = async () => {
    editCasefile.mutate(
      {
        _id: id,
        ...inputs,
        expenses: editExpenses,
        courtSitting: editCourtSitting,
        deposit: editDeposit,
        caseType: casefile,
      },
      {
        onSuccess: async (
          response: AxiosResponse<IResponse<ICasefilesResponse>>
        ) => {
          const { data } = response;
          setLoading(false);
          toast.success(data.message!);
          setIsEdit(false);
          refetch();
        },
        onError: (error) => {
          const err = error as AxiosError;
          if (err.response) {
            setLoading(false);
            toast.error(err.response.data.message);
          }
        },
      }
    );
  };

  const { handleChange, handleSubmit, inputs } = useForm<ICasefile>(
    {} as ICasefile,
    EditCasefile
  );

  useEffect(() => {
    setEditExpenses(caseFile?.expenses!);
    setEditDeposit(caseFile?.deposit!);
    setCourtSitting(caseFile?.court_sitting!);
  }, [caseFile]);

  return (
    <AppLayout>
      <Paragraph weight="w500">Case Details</Paragraph>
      <>
        {edit ? (
          <form onSubmit={handleSubmit}>
            <Card className="mb-20 mt-20">
              <CardBody>
                <SmallText weight="w600" className="mb-20">
                  Client Details
                </SmallText>
                <Grid xl="1fr 1fr">
                  <div className="mt-10">
                    <SmallText weight="w500">Client Name</SmallText>
                    <Input
                      placeholder=""
                      type="text"
                      name="client"
                      className="mt-10"
                      onChange={handleChange}
                      defaultValue={caseFile?.client}
                    />
                  </div>
                </Grid>
                <Grid xl="1fr 1fr">
                  <div>
                    <SmallText weight="w500">Gender</SmallText>
                    <Input
                      placeholder=""
                      type="text"
                      name="gender"
                      className="mt-10"
                      onChange={handleChange}
                      defaultValue={caseFile?.gender}
                    />
                  </div>
                </Grid>
                <Grid xl="1fr 1fr">
                  <div>
                    <SmallText weight="w500">Occupation</SmallText>
                    <Input
                      placeholder=""
                      type="text"
                      name="occupation"
                      className="mt-10"
                      onChange={handleChange}
                      defaultValue={caseFile?.occupation}
                    />
                  </div>
                </Grid>
              </CardBody>
            </Card>
            <Card className="mb-20">
              <CardBody>
                <SmallText weight="w600">Case Details</SmallText>
                <Grid xl="1fr 1fr">
                  <div className="mb-15 mt-10">
                    <div className="mb-10">
                      <SmallText weight="w500">Case Type</SmallText>
                    </div>
                    <SelectField
                      background="light"
                      placeholder="Select case type"
                      options={casefileList}
                      defaultValue={caseFile?.case_type}
                      borderRadius="4px"
                      height={150}
                      handleChange={(data: string) => setCasefile(data)}
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
                      name="caseFileSummary"
                      onChange={handleChange}
                      defaultValue={caseFile?.letter_of_engagement}
                    />
                  </div>
                </Grid>
                <Grid xl="1fr 1fr">
                  <div>
                    <SmallText weight="w500">Service Fee</SmallText>
                    <Input
                      placeholder=""
                      type="number"
                      className="mt-10"
                      name="serviceFee"
                      onChange={handleChange}
                      defaultValue={caseFile?.service_fee}
                    />
                  </div>
                </Grid>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Court Sitting</SmallText>
                </div>
                <div>
                  {caseFile?.court_sitting.map(
                    (item: ICourtSitting, index: number) => (
                      <Grid xl="1fr 1fr" key={index}>
                        <div>
                          <SmallText weight="w500">Date</SmallText>
                          <Input
                            placeholder=""
                            type="text"
                            name="date"
                            className="mt-10"
                            defaultValue={item.date}
                            onChange={(e) =>
                              handleCourtSittingDate(index, e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <SmallText weight="w500">Note</SmallText>
                          <Input
                            placeholder=""
                            type="text"
                            name="note"
                            className="mt-10"
                            defaultValue={item.note}
                            onChange={(e) =>
                              handleCourtSittingNote(index, e.target.value)
                            }
                          />
                        </div>
                      </Grid>
                    )
                  )}
                </div>
              </CardBody>
            </Card>
            <Card className="mb-20 mt-20">
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Expenses</SmallText>
                </div>
                <div>
                  {caseFile?.expenses.map((item: IExpenses, index: number) => (
                    <Grid xl="1fr 1fr" key={index}>
                      <div>
                        <SmallText weight="w500">Amount</SmallText>
                        <Input
                          placeholder=""
                          type="number"
                          name="amount"
                          className="mt-10"
                          defaultValue={item.amount}
                          onChange={(e) =>
                            handleExpenseAmountChange(index, e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <SmallText weight="w500">Note</SmallText>
                        <Input
                          placeholder=""
                          type="text"
                          className="mt-10"
                          name="note"
                          defaultValue={item.note}
                          onChange={(e) =>
                            handleExpenseNoteChange(index, e.target.value)
                          }
                        />
                      </div>
                    </Grid>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Deposit</SmallText>
                </div>
                <div>
                  {caseFile?.deposit.map((item: IDeposit, index: number) => (
                    <Grid xl="1fr 1fr" key={index}>
                      <div>
                        <SmallText weight="w500">Amount</SmallText>
                        <Input
                          placeholder=""
                          type="text"
                          className="mt-10"
                          name="amount"
                          defaultValue={item.amount}
                          onChange={(e) =>
                            handleDepositAmount(index, e.target.value)
                          }
                        />
                      </div>
                    </Grid>
                  ))}
                </div>
              </CardBody>
            </Card>
            {edit && (
              <Flex justifyContent="end" className="mt-20">
                <Button
                  type="submit"
                  disabled={editCasefile.isLoading}
                  loading={editCasefile.isLoading}
                >
                  Save
                </Button>
                <DeleteModal
                  toggleModal={toggleModal}
                  setToggleModal={setToggleModal}
                  isloading={isLoading}
                  loading={loading}
                  submit={submit}
                />
              </Flex>
            )}
          </form>
        ) : (
          <>
            <Card className="mt-20">
              <CardBody>
                <Grid xl="1.5fr 1fr" lg="1fr" gap={3} className="mb-20">
                  <Card bgColor="cream" className="h-100">
                    <CardBody>
                      <Flex justifyContent="space-between">
                        <Flex>
                          <Paragraph weight="w600">Case status:</Paragraph>
                          <Paragraph weight="w500">
                            {caseFile?.status}
                          </Paragraph>
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
                        <Paragraph weight="w400">
                          {caseFile?.case_type}
                        </Paragraph>
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
                      <Paragraph weight="w500">Total Deposit</Paragraph>
                      <>
                        {caseFile?.deposit.map(
                          (item: IDeposit, index: number) => (
                            <ul key={index}>
                              <li>
                                <SmallText>{item.amount}</SmallText>
                              </li>
                            </ul>
                          )
                        )}
                      </>
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

                    <>
                      {caseFile?.expenses.map(
                        (item: IExpenses, index: number) => (
                          <>
                            <div className="py-15 px-15" key={index}>
                              <Flex>
                                <Paragraph weight="w500">Amount:</Paragraph>
                                <Paragraph weight="w400">
                                  {item.amount}
                                </Paragraph>
                              </Flex>
                              <Flex>
                                <Paragraph weight="w500">Note</Paragraph>
                                <Paragraph weight="w400">{item.note}</Paragraph>
                              </Flex>
                            </div>

                            <hr style={{ borderTop: "dashed 1px" }} />
                          </>
                        )
                      )}
                    </>
                  </Card>
                </Grid>
              </CardBody>
            </Card>
            <Flex justifyContent="end" className="mt-20">
              <Button onClick={() => setIsEdit(true)}>Edit</Button>

              <DeleteModal
                toggleModal={toggleModal}
                setToggleModal={setToggleModal}
                isloading={isLoading}
                loading={loading}
                submit={submit}
              />
            </Flex>
          </>
        )}
      </>
    </AppLayout>
  );
};

export default CasefileDetails;
