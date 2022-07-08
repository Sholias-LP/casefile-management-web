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
import AppLayout from "../../components/appLayout";
import { IDeposit, IExpenses } from "../../interfaces/casefiles";
import { IResponse, ISelect } from "../../interfaces/response";
import {
  ITransaction,
  ITransactionsResponse,
} from "../../interfaces/transactions";
import { ITransactionTypes } from "../../interfaces/user";
import useForm from "../../utils/useForm";
import {
  useDeleteTransactions,
  useUpdateTransactions,
} from "../api/mutations/transactions";
import { useGetATransaction } from "../api/queries/transactions";
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

const TransactionDetails: FC<IProps> = ({ id }) => {
  const { data, refetch } = useGetATransaction(id);
  const transactions = data?.data.data;
  const [edit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<string>("");
  const [editDeposit, setEditDeposit] = useState<IDeposit[]>(
    transactions?.deposit!
  );
  const [editExpenses, setEditExpenses] = useState<IExpenses[]>(
    transactions?.expenses!
  );
  const { mutate, isLoading } = useDeleteTransactions();
  const router = useRouter();
  const editTransactions = useUpdateTransactions();

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

  const submit = async () => {
    setLoading(true);
    mutate(id, {
      onSuccess: async (res: AxiosResponse<IResponse>) => {
        const { data } = res;
        setLoading(false);
        toast.success(data.message!);
        router.push("/transactions");
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

  const EditTransactions = async () => {
    editTransactions.mutate(
      {
        _id: id,
        ...inputs,
        expenses: editExpenses,
        deposit: editDeposit,
        transactionType: transaction,
      },
      {
        onSuccess: async (
          response: AxiosResponse<IResponse<ITransactionsResponse>>
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

  const transactionTypes = useGetResourceTypes();

  const TransactionList: ISelect[] = [];

  transactionTypes.data?.data.data.transactions.map(
    (item: ITransactionTypes) => {
      return TransactionList.push({ text: item.name, value: item.name });
    }
  );

  const { handleChange, handleSubmit, inputs } = useForm<ITransaction>(
    {} as ITransaction,
    EditTransactions
  );

  useEffect(() => {
    setEditExpenses(transactions?.expenses!);
    setEditDeposit(transactions?.deposit!);
  }, [transactions]);

  return (
    <AppLayout>
      <Paragraph weight="w500">Transaction Details</Paragraph>
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
                      defaultValue={transactions?.client}
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
                      defaultValue={transactions?.gender}
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
                      defaultValue={transactions?.occupation}
                    />
                  </div>
                </Grid>
              </CardBody>
            </Card>
            <Card className="mb-20">
              <CardBody>
                <SmallText weight="w600">Transaction Details</SmallText>
                <Grid xl="1fr 1fr">
                  <div className="mb-15 mt-10">
                    <div className="mb-10">
                      <SmallText weight="w500">Transaction Type</SmallText>
                    </div>
                    <SelectField
                      background="light"
                      placeholder="Transaction Type"
                      options={TransactionList}
                      defaultValue={transactions?.transaction_type}
                      borderRadius="4px"
                      height={150}
                      handleChange={(data: string) => setTransaction(data)}
                    />
                  </div>
                </Grid>
                <Grid xl="1fr 1fr">
                  <div>
                    <SmallText weight="w500">Transaction Summary</SmallText>
                    <Input
                      placeholder=""
                      type="text"
                      className="mt-10"
                      name="transactionSummary"
                      onChange={handleChange}
                      defaultValue={transactions?.transaction_summary}
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
                      defaultValue={transactions?.service_fee}
                    />
                  </div>
                </Grid>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Expenses</SmallText>
                </div>
                <div>
                  {transactions?.expenses.map(
                    (item: IExpenses, index: number) => (
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
                    )
                  )}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="mb-10">
                  <SmallText weight="w600">Deposit</SmallText>
                </div>
                <div>
                  {transactions?.deposit.map(
                    (item: IDeposit, index: number) => (
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
                    )
                  )}
                </div>
              </CardBody>
            </Card>
            <Flex justifyContent="end" className="mt-20">
              {edit && (
                <Flex justifyContent="end" className="mt-20">
                  <Button
                    type="submit"
                    disabled={editTransactions.isLoading}
                    loading={editTransactions.isLoading}
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
            </Flex>
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
                          <Paragraph weight="w600">
                            Transaction status:
                          </Paragraph>
                          <Paragraph weight="w500">
                            {transactions?.status}
                          </Paragraph>
                        </Flex>
                        <Flex gap={0.4}>
                          <SvgEyeOpen />
                          <SmallText>{transactions?.views}</SmallText>
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
                          {transactions?.client}
                        </Paragraph>
                      </Flex>
                      <Flex>
                        <Paragraph className="mb-10" weight="w500">
                          Transaction Type:
                        </Paragraph>
                        <Paragraph weight="w400">
                          {transactions?.transaction_type}
                        </Paragraph>
                      </Flex>
                      <Flex>
                        <Paragraph className="mb-10" weight="w500">
                          Transaction ID:
                        </Paragraph>
                        <Paragraph weight="w400">
                          {transactions?.transaction_id}
                        </Paragraph>
                      </Flex>
                      <Flex>
                        <Paragraph weight="w500">Date: </Paragraph>
                        <Paragraph>
                          {moment(transactions?.createdAt).format("LL")}
                        </Paragraph>
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card bgColor="cream" className="h-100">
                    <CardBody>
                      <Flex>
                        <Paragraph weight="w600">Service Fee:</Paragraph>
                        <Paragraph weight="w500">
                          {transactions?.service_fee}
                        </Paragraph>
                      </Flex>
                    </CardBody>
                    <Divider />
                    <CardBody className="h-100">
                      <Paragraph weight="w500">Total Deposit</Paragraph>
                      <>
                        {transactions?.deposit.map(
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
                      <Paragraph weight="w500">Expenses</Paragraph>
                    </CardBody>
                    <Divider />
                    <CardBody className="h-100">
                      <>
                        {transactions?.expenses.map(
                          (item: IExpenses, index: number) => (
                            <div key={index}>
                              <Flex>
                                <Paragraph weight="w500">Amount: </Paragraph>
                                <Paragraph weight="w400">
                                  {item.amount}
                                </Paragraph>
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
            <Flex className="mt-20" justifyContent="end">
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

export default TransactionDetails;
