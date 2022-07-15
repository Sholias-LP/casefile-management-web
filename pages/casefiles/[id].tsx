import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { FC, lazy, useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import {
  Badge,
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
import { X } from "truparse-lodre/lib/icons";
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
  const { data, refetch, isSuccess } = useGetACasefile(id);
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
  const [addExpenses, setAddExpenses] = useState<boolean>(false);
  const [addDeposit, setAddDeposit] = useState<boolean>(false);
  const [courtSitting, setAddCourtSitting] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<string>("");
  const [expensesNote, setExpensesNote] = useState<string>("");
  const [courtNote, setCourtNote] = useState<string>("");
  const [expensesAmount, setExpensesAmount] = useState<string>("");
  const [courtDate, setCourtDate] = useState<string>("");
  const [item, setItem] = useState();

  const editCasefile = useUpdateCasefile();

  const router = useRouter();

  const getLastItem = () => {
    const lastItem = caseFile?.expenses.length! - 1;
  };

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

  casefileTypes.data?.data.data.casefiles.map((item: ICasefileTypes, index) => {
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
    getLastItem();
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
                <Grid xl="1fr 1fr">
                  <>
                    <div>
                      {caseFile?.court_sitting.map(
                        (item: ICourtSitting, index: number) => (
                          <Card key={index} border className="mb-10">
                            <CardBody>
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

                              <SmallText weight="w500">Endorsements</SmallText>
                              <textarea
                                placeholder=""
                                name="note"
                                className="mt-10"
                                defaultValue={item.note}
                                onChange={(e) =>
                                  handleCourtSittingNote(index, e.target.value)
                                }
                              />
                            </CardBody>
                          </Card>
                        )
                      )}
                      {courtSitting && (
                        <Card border className="mb-10">
                          <CardBody>
                            <SmallText weight="w500">New Date</SmallText>
                            <Input
                              placeholder=""
                              type="text"
                              name="date"
                              className="mt-10"
                              value={courtDate}
                              onChange={(e) => setCourtDate(e.target.value)}
                            />

                            <SmallText weight="w500">New Note</SmallText>
                            <textarea
                              placeholder=""
                              name="note"
                              className="mt-10"
                              value={courtNote}
                              onChange={(e) => setCourtNote(e.target.value)}
                            />
                          </CardBody>
                        </Card>
                      )}
                      {courtSitting ? (
                        <Button
                          onClick={() => {
                            setCourtSitting([
                              ...editCourtSitting,
                              { date: courtDate, note: courtNote },
                            ]),
                              setCourtDate(""),
                              setCourtNote("");
                          }}
                          type="button"
                          disabled={courtDate === "" || courtNote === ""}
                        >
                          Add Court Sitting
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setAddCourtSitting(true);
                          }}
                          type="button"
                        >
                          Add New Court Sitting
                        </Button>
                      )}
                    </div>
                    <div>
                      <SmallText weight="w500">Preview</SmallText>

                      {editCourtSitting.length > 0 ? (
                        <Grid
                          xl="repeat(1, auto)"
                          lg="repeat(1, auto)"
                          md="repeat(1, auto)"
                          sm="repeat(1, auto)"
                          className="mt-10"
                        >
                          {editCourtSitting.map(
                            (el: ICourtSitting, index: number) => (
                              <Card
                                bgColor="primary"
                                className="px-20 py-10"
                                key={index}
                              >
                                <Flex
                                  justifyContent="space-between"
                                  className="mb-10"
                                >
                                  <SmallText weight="w500">
                                    Date: {el.date}
                                  </SmallText>
                                  <X
                                    style={{ cursor: "pointer" }}
                                    width={14}
                                    height={14}
                                    onClick={() =>
                                      setCourtSitting(
                                        editCourtSitting.filter(
                                          (item: ICourtSitting) => {
                                            return item !== el;
                                          }
                                        )
                                      )
                                    }
                                  />
                                </Flex>
                                <SmallText weight="w500">
                                  Note: {el.note}
                                </SmallText>
                              </Card>
                            )
                          )}
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                </Grid>
              </CardBody>
            </Card>
            <Card className="mb-20 mt-20">
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Expenses</SmallText>
                </div>
                <Grid xl="1fr 1fr">
                  <div>
                    {caseFile?.expenses.map(
                      (item: IExpenses, index: number) => (
                        <div key={index}>
                          <Card border className="mb-10">
                            <CardBody>
                              <SmallText weight="w500">Amount</SmallText>
                              <Input
                                placeholder=""
                                type="number"
                                name="amount"
                                className="mt-10"
                                defaultValue={item.amount}
                                onChange={(e) =>
                                  handleExpenseAmountChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              />
                              <SmallText weight="w500">Note</SmallText>
                              <textarea
                                placeholder=""
                                className="mt-10"
                                name="note"
                                defaultValue={item.note}
                                onChange={(e) =>
                                  handleExpenseNoteChange(index, e.target.value)
                                }
                              />
                            </CardBody>
                          </Card>
                        </div>
                      )
                    )}
                    {addExpenses && (
                      <Card border className="mb-10">
                        <CardBody>
                          <SmallText weight="w500">New Amount</SmallText>
                          <Input
                            placeholder=""
                            type="number"
                            name="amount"
                            className="mt-10"
                            required
                            value={expensesAmount}
                            onChange={(e) => setExpensesAmount(e.target.value)}
                          />
                          <SmallText weight="w500">New Note</SmallText>
                          <textarea
                            placeholder=""
                            className="mt-10"
                            value={expensesNote}
                            required
                            name="note"
                            onChange={(e) => setExpensesNote(e.target.value)}
                          />
                        </CardBody>
                      </Card>
                    )}
                    {addExpenses ? (
                      <Button
                        onClick={() => {
                          addExpenses;
                          setEditExpenses([
                            ...editExpenses,
                            {
                              amount: Number(expensesAmount),
                              note: expensesNote,
                            },
                          ]),
                            setExpensesAmount(""),
                            setExpensesNote("");
                        }}
                        type="button"
                        disabled={expensesAmount === "" || expensesNote === ""}
                      >
                        Add Expenses
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setAddExpenses(true);
                        }}
                        type="button"
                      >
                        Add New Expenses
                      </Button>
                    )}
                  </div>
                  <div>
                    <SmallText weight="w500">Preview</SmallText>

                    {editExpenses.length > 0 ? (
                      <Grid
                        xl="repeat(1, auto)"
                        lg="repeat(1, auto)"
                        md="repeat(1, auto)"
                        sm="repeat(1, auto)"
                        className="mt-10"
                      >
                        {editExpenses.map((el: IExpenses, index: number) => (
                          <Card
                            bgColor="primary"
                            className="px-20 py-10"
                            key={index}
                          >
                            <Flex
                              justifyContent="space-between"
                              className="mb-10"
                            >
                              <SmallText weight="w500">
                                Amount: &#8358;{el.amount.toLocaleString()}
                              </SmallText>
                              <X
                                style={{ cursor: "pointer" }}
                                width={14}
                                height={14}
                                onClick={() =>
                                  setEditExpenses(
                                    editExpenses.filter((item: IExpenses) => {
                                      return item !== el;
                                    })
                                  )
                                }
                              />
                            </Flex>
                            <SmallText weight="w500">Note: {el.note}</SmallText>
                          </Card>
                        ))}
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </div>
                </Grid>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Deposit</SmallText>
                </div>
                <Grid xl="1fr 1fr">
                  <>
                    <div>
                      {caseFile?.deposit.map(
                        (item: IDeposit, index: number) => (
                          <div key={index}>
                            <Card border className="mb-10">
                              <CardBody>
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
                              </CardBody>
                            </Card>
                          </div>
                        )
                      )}
                      {addDeposit && (
                        <Card border className="mb-10">
                          <CardBody>
                            <SmallText weight="w500">New Deposit</SmallText>
                            <Input
                              placeholder=""
                              type="number"
                              name="amount"
                              className="mt-10"
                              value={deposit}
                              onChange={(e) => setDeposit(e.target.value)}
                            />
                          </CardBody>
                        </Card>
                      )}
                      {addDeposit ? (
                        <Button
                          onClick={(e) => {
                            setEditDeposit([
                              ...editDeposit,
                              { amount: Number(deposit) },
                            ]),
                              setDeposit("");
                          }}
                          disabled={deposit === ""}
                          type="button"
                        >
                          Add Deposit
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            setAddDeposit(true);
                          }}
                          type="button"
                        >
                          Add New Deposit
                        </Button>
                      )}
                    </div>

                    <div>
                      <SmallText weight="w500">Preview</SmallText>

                      {editDeposit.length > 0 ? (
                        <Grid
                          xl="repeat(5, auto)"
                          lg="repeat(5, auto)"
                          md="repeat(5, auto)"
                          sm="repeat(2, auto)"
                          className="mt-20"
                        >
                          {editDeposit.map((el: IDeposit, index: number) => (
                            <Badge
                              fillColor="primary"
                              key={index}
                              borderColor={"cream"}
                              color="dark"
                            >
                              <Flex justifyContent="space-between">
                                <SmallText weight="w600">
                                  &#8358;{el.amount}
                                </SmallText>
                                <X
                                  style={{ cursor: "pointer" }}
                                  width={14}
                                  height={14}
                                  onClick={() =>
                                    setEditDeposit(
                                      editDeposit.filter(
                                        (deposit: IDeposit) => {
                                          return deposit !== el;
                                        }
                                      )
                                    )
                                  }
                                />
                              </Flex>
                            </Badge>
                          ))}
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                </Grid>
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
            {isSuccess ? (
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
                            <Paragraph weight="w400">
                              {caseFile?.client}
                            </Paragraph>
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
                                <li key={index}>
                                  <SmallText>{item.amount}</SmallText>
                                </li>
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
                        <div className="py-10 px-30">
                          <Flex>
                            <Paragraph className="mb-10" weight="w500">
                              Brief:
                            </Paragraph>
                            <Paragraph className="mb-10" weight="w400">
                              {caseFile?.brief}
                            </Paragraph>
                          </Flex>

                          <Paragraph weight="w500">Course Sitting</Paragraph>
                        </div>
                        <>
                          {caseFile?.court_sitting.map(
                            (item: ICourtSitting, index) => (
                              <div key={index}>
                                <div className="py-10 px-30">
                                  <Flex className="mb-5">
                                    <Paragraph weight="w500">Date: </Paragraph>
                                    <Paragraph weight="w400">
                                      {item.date}
                                    </Paragraph>
                                  </Flex>
                                  <Flex>
                                    <Paragraph weight="w500">
                                      Endorsements:
                                    </Paragraph>
                                    <Paragraph weight="w400">
                                      {item.note}
                                    </Paragraph>
                                  </Flex>
                                </div>
                                {index != caseFile.court_sitting.length - 1 ? (
                                  <hr style={{ borderTop: "dashed 1px" }} />
                                ) : (
                                  ""
                                )}
                              </div>
                            )
                          )}
                        </>
                      </Card>
                      <Card bgColor="cream" className="h-100">
                        <CardBody>
                          <Paragraph weight="w500">Expenses</Paragraph>
                        </CardBody>
                        <Divider />

                        <>
                          {caseFile?.expenses.map(
                            (item: IExpenses, index: number) => (
                              <div key={index}>
                                <>
                                  <div className="py-15 px-30" key={index}>
                                    <Flex>
                                      <Paragraph weight="w500">
                                        Amount:
                                      </Paragraph>
                                      <Paragraph weight="w400">
                                        {item.amount}
                                      </Paragraph>
                                    </Flex>
                                    <Flex>
                                      <Paragraph weight="w500">Note</Paragraph>
                                      <Paragraph weight="w400">
                                        {item.note}
                                      </Paragraph>
                                    </Flex>
                                  </div>
                                </>
                                {index != caseFile.expenses.length - 1 ? (
                                  <hr style={{ borderTop: "dashed 1px" }} />
                                ) : (
                                  ""
                                )}
                              </div>
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
            ) : (
              <Card className="h-100 mt-20">
                <CardBody className="h-100">
                  <Flex justifyContent="center">
                    <LoaderIcon style={{ width: "50px", height: "50px" }} />
                  </Flex>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </>
    </AppLayout>
  );
};

export default CasefileDetails;
