import { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
import { useAddCasefile } from "../api/mutations/casefiles";
import { useGetResourceTypes } from "../api/queries/users";

const AddCasefile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [caseType, setCaseType] = useState<string>("");
  const [deposits, setDeposits] = useState<IDeposit[]>([]);
  const [deposit, setDeposit] = useState<string>("");
  const [expense, setExpenses] = useState<IExpenses[]>([]);
  const [courtSittings, setCourtSitting] = useState<ICourtSitting[]>([]);
  const [expensesNote, setExpensesNote] = useState<string>("");
  const [courtNote, setCourtNote] = useState<string>("");
  const [expensesAmount, setExpensesAmount] = useState<string>("");
  const [courtDate, setCourtDate] = useState<string>("");
  const [brief, setBrief] = useState<string>("");
  const [letterOfEngagement, setLetterOfEngagement] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const { mutate } = useAddCasefile();
  const router = useRouter();

  const { data } = useGetResourceTypes();

  const CaseFileList: ISelect[] = [];

  data?.data.data.casefiles.map((item: ICasefileTypes) => {
    return CaseFileList.push({ text: item.name, value: item.name });
  });

  const submit = async () => {
    setLoading(true);
    mutate(
      {
        ...inputs,
        expenses: expense,
        courtSitting: courtSittings,
        deposit: deposits,
        caseType: caseType,
        letterOfEngagement: letterOfEngagement,
        brief: brief,
        gender: gender,
      },
      {
        onSuccess: async (
          response: AxiosResponse<IResponse<ICasefilesResponse>>
        ) => {
          const { data } = response;
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
      }
    );
  };

  const { inputs, handleChange, handleSubmit } = useForm<ICasefile>(
    {} as ICasefile,
    submit
  );

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <Paragraph weight="w600" className="mb-20">
          Add a Case file
        </Paragraph>
        <Card className="mb-20">
          <CardBody>
            <SmallText weight="w600" className="mb-20">
              Client Details{" "}
              <span style={{ color: "red", fontSize: "8px" }}>(required)</span>
            </SmallText>
            <Grid xl="1fr 1fr">
              <div className="mt-10">
                <SmallText weight="w500">Client</SmallText>
                <Input
                  placeholder="Full name"
                  type="text"
                  name="client"
                  className="mt-10"
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid xl="1fr 1fr" className="mb-10">
              <div>
                <div className="mb-10">
                  <SmallText weight="w500">Gender</SmallText>
                </div>
                <SelectField
                  background="light"
                  placeholder="Select Gender"
                  options={[
                    {
                      text: "Male",
                      value: "male",
                    },
                    {
                      text: "Female",
                      value: "female",
                    },
                  ]}
                  borderRadius="4px"
                  handleChange={(data: string) => setGender(data)}
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
                  <SmallText weight="w500">
                    Case Type{" "}
                    <span style={{ color: "red", fontSize: "8px" }}>
                      (required)
                    </span>
                  </SmallText>
                </div>
                <SelectField
                  background="light"
                  placeholder="Select Case Type"
                  options={CaseFileList}
                  borderRadius="4px"
                  height={150}
                  handleChange={(data: string) => setCaseType(data)}
                />
              </div>
            </Grid>
            <Grid xl="1fr 1fr">
              <div>
                <SmallText weight="w500">
                  Service Fee{"   "}
                  (&#8358;) &nbsp;
                  <span style={{ color: "red", fontSize: "8px" }}>
                    (required)
                  </span>
                </SmallText>
                <Input
                  placeholder="e.g. 5000000"
                  type="number"
                  className="mt-10"
                  name="serviceFee"
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid xl="1fr 1fr" className="mb-10">
              <div>
                <div>
                  <SmallText weight="w500">Brief</SmallText>
                </div>

                <textarea
                  placeholder="Lawyer's understanding / summary of the client's needs"
                  className="mt-10"
                  name="brief"
                  onChange={(e) => setBrief(e.target.value)}
                  rows={6}
                />
              </div>
            </Grid>
            <Grid xl="1fr 1fr">
              <div>
                <div>
                  <SmallText weight="w500">Letter of Engagement</SmallText>{" "}
                </div>

                <textarea
                  placeholder="Letter of engagment"
                  className="mt-10"
                  name="letterOfEngagement"
                  onChange={(e) => setLetterOfEngagement(e.target.value)}
                  rows={8}
                />
              </div>
            </Grid>
          </CardBody>
        </Card>
        <Card className="mb-20">
          <CardBody>
            <div className="mb-10">
              <SmallText weight="w600">Court Sitting</SmallText>
            </div>

            <Grid xl="1fr 1fr" gap={2}>
              <div>
                <div>
                  <SmallText weight="w500">Date</SmallText>
                  <Input
                    placeholder=""
                    type="date"
                    className="mt-10"
                    value={courtDate}
                    name="date"
                    onChange={(e) => setCourtDate(e.target.value)}
                  />
                </div>

                <div>
                  <SmallText weight="w500">Endorsements</SmallText>
                  <textarea
                    placeholder=""
                    className="mt-10 mb-20"
                    name="note"
                    onChange={(e) => setCourtNote(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  size="small"
                  onClick={() => {
                    setCourtSitting([
                      ...courtSittings,
                      {
                        date: courtDate,
                        note: courtNote,
                      },
                    ]);
                    setCourtDate("");
                    setCourtNote("");
                  }}
                  disabled={
                    courtSittings.length === 3 ||
                    courtDate === "" ||
                    courtNote === ""
                  }
                >
                  Add Court Sitting
                </Button>
              </div>
              <div>
                <SmallText weight="w500">Preview</SmallText>

                {courtSittings.length > 0 ? (
                  <Grid
                    xl="repeat(2, auto)"
                    lg="repeat(2, auto)"
                    md="repeat(2, auto)"
                    sm="repeat(1, auto)"
                    className="mt-10"
                  >
                    {courtSittings.map((el: ICourtSitting, index: number) => (
                      <Card
                        bgColor="primary"
                        className="px-20 py-10"
                        key={index}
                      >
                        <Flex justifyContent="space-between" className="mb-10">
                          <SmallText weight="w500">Date: {el.date}</SmallText>
                          <X
                            style={{ cursor: "pointer" }}
                            width={14}
                            height={14}
                            onClick={() =>
                              setCourtSitting(
                                courtSittings.filter((item: ICourtSitting) => {
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
        <Card className="mb-20">
          <CardBody>
            <div className="mb-10">
              <SmallText weight="w600">Expenses</SmallText>
            </div>

            <Grid xl="1fr 1fr">
              <div>
                <SmallText weight="w500">Amount (&#8358;)</SmallText>
                <Input
                  placeholder="e.g. 200000"
                  type="number"
                  name="amount"
                  min={0}
                  value={expensesAmount}
                  className="mt-10"
                  onChange={(e) => setExpensesAmount(e.target.value)}
                />
                <SmallText weight="w500">Add a note</SmallText>
                <textarea
                  placeholder="e.g. flight ticket, hotel accommodation etc"
                  className="mt-10 mb-20"
                  name="note"
                  onChange={(e) => setExpensesNote(e.target.value)}
                  rows={4}
                />
                <Button
                  size="small"
                  onClick={() => {
                    setExpenses([
                      ...expense,
                      {
                        amount: Number(expensesAmount),
                        note: expensesNote,
                      },
                    ]);
                    setExpensesAmount("");
                    setExpensesNote("");
                  }}
                  disabled={
                    expense.length === 3 ||
                    expensesNote === "" ||
                    expensesAmount === ""
                  }
                >
                  Add Expenses
                </Button>
              </div>
              <div>
                <SmallText weight="w500">Preview</SmallText>

                {expense.length > 0 ? (
                  <Grid
                    xl="repeat(2, auto)"
                    lg="repeat(2, auto)"
                    md="repeat(2, auto)"
                    sm="repeat(1, auto)"
                    className="mt-10"
                  >
                    {expense.map((el: IExpenses, index: number) => (
                      <Card
                        bgColor="primary"
                        className="px-20 py-10"
                        key={index}
                      >
                        <Flex justifyContent="space-between" className="mb-10">
                          <SmallText weight="w500">
                            Amount: &#8358;{el.amount}
                          </SmallText>
                          <X
                            style={{ cursor: "pointer" }}
                            width={14}
                            height={14}
                            onClick={() =>
                              setExpenses(
                                expense.filter((item: IExpenses) => {
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

        <Card className="mb-20">
          <CardBody>
            <div className="mb-10">
              <SmallText weight="w600">Deposit</SmallText>
            </div>
            <Grid xl="1fr 1fr">
              <div>
                <SmallText weight="w500">Amount (&#8358;)</SmallText>
                <Input
                  placeholder="e.g. 200000"
                  type="number"
                  name="amount"
                  min={0}
                  value={deposit}
                  className="mt-10"
                  onChange={(e) => setDeposit(e.target.value)}
                />
                <Button
                  size="small"
                  onClick={() => {
                    setDeposits([...deposits, { amount: Number(deposit) }]);
                    setDeposit("");
                  }}
                  disabled={deposits.length === 5 || deposit === ""}
                >
                  Add Deposit
                </Button>
              </div>
              <div>
                <SmallText weight="w500">Preview</SmallText>

                {deposits.length > 0 ? (
                  <Grid
                    xl="repeat(5, auto)"
                    lg="repeat(5, auto)"
                    md="repeat(5, auto)"
                    sm="repeat(2, auto)"
                    className="mt-20"
                  >
                    {deposits.map((el: IDeposit, index: number) => (
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
                              setDeposits(
                                deposits.filter((deposit: IDeposit) => {
                                  return deposit !== el;
                                })
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
            </Grid>
          </CardBody>
        </Card>

        <Flex justifyContent="end" className="mt-20">
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </AppLayout>
  );
};

export default AddCasefile;
