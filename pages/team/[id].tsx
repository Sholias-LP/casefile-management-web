import Link from "next/link";
import React, { FC } from "react";
import { LoaderIcon } from "react-hot-toast";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import { Overview } from "truparse-lodre/lib/icons";
import AppLayout from "../../components/appLayout";
import { ICasefilesResponse } from "../../interfaces/casefiles";
import { ITransactionsResponse } from "../../interfaces/transactions";
import { useGetUserResources } from "../api/queries/users";

type IProps = {
  id: string;
  userName: string;
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

const TeamDetails: FC<IProps> = ({ id }) => {
  const { data, isLoading, isSuccess } = useGetUserResources(id);

  return (
    <AppLayout>
      <Paragraph weight="w600" className="mb-20">
        User Resourses
      </Paragraph>
      {data?.data.data.casefiles.length === 0 &&
      data?.data.data.transactions.length === 0 ? (
        <Card className="h-100">
          <CardBody className="h-100">
            <Flex justifyContent="center" className="pb-30 emptystateIcon">
              <Overview width={60} height={60} />
            </Flex>

            <Flex justifyContent="center" className="mb-20">
              <Paragraph>User has No Casefiles or Transactions Yet.</Paragraph>
            </Flex>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card>
            <CardBody>
              <>
                <div className="mb-20">
                  <SmallText weight="w600">Casefiles</SmallText>
                </div>

                <>
                  {isLoading ? (
                    <Card className="h-100">
                      <CardBody className="h-100">
                        <Flex justifyContent="center">
                          <LoaderIcon
                            style={{ width: "50px", height: "50px" }}
                          />
                        </Flex>
                      </CardBody>
                    </Card>
                  ) : (
                    <>
                      {data?.data.data.casefiles.length === 0 ? (
                        <Card className="h-100">
                          <CardBody className="h-100">
                            <Flex
                              justifyContent="center"
                              className="pb-30 emptystateIcon"
                            >
                              <Overview width={60} height={60} />
                            </Flex>

                            <Flex justifyContent="center" className="mb-20">
                              <Paragraph>User has No Casefiles Yet.</Paragraph>
                            </Flex>
                          </CardBody>
                        </Card>
                      ) : (
                        <Grid className="mb-20" xl="1fr 1fr">
                          <>
                            {data?.data.data.casefiles.map(
                              (item: ICasefilesResponse, index: number) => (
                                <Link
                                  href={{
                                    pathname: "/casefiles/[id]",
                                    query: { id: item._id },
                                  }}
                                  key={index}
                                >
                                  <a>
                                    <Card bgColor="cream">
                                      <CardBody>
                                        <Flex>
                                          <Paragraph weight="w600">
                                            Client Name :
                                          </Paragraph>
                                          <Paragraph>{item.client}</Paragraph>
                                        </Flex>
                                        <Flex>
                                          <Paragraph weight="w600">
                                            Client Occupation :
                                          </Paragraph>
                                          <Paragraph>
                                            {item.occupation}
                                          </Paragraph>
                                        </Flex>
                                        <Flex>
                                          <Paragraph weight="w600">
                                            Client Gender :
                                          </Paragraph>
                                          <Paragraph>{item.gender}</Paragraph>
                                        </Flex>
                                      </CardBody>
                                    </Card>
                                  </a>
                                </Link>
                              )
                            )}
                          </>
                        </Grid>
                      )}
                    </>
                  )}
                </>
              </>
            </CardBody>
          </Card>
          <Card className="mt-20">
            <CardBody>
              <div className="mb-20">
                <SmallText weight="w600">Transactions</SmallText>
              </div>
              <>
                {isLoading ? (
                  <Card className="h-100">
                    <CardBody className="h-100">
                      <Flex justifyContent="center">
                        <LoaderIcon style={{ width: "50px", height: "50px" }} />
                      </Flex>
                    </CardBody>
                  </Card>
                ) : (
                  <>
                    {data?.data.data.transactions.length === 0 ? (
                      <Card className="h-100">
                        <CardBody className="h-100">
                          <Flex
                            justifyContent="center"
                            className="pb-30 emptystateIcon"
                          >
                            <Overview width={60} height={60} />
                          </Flex>

                          <Flex justifyContent="center" className="mb-20">
                            <Paragraph>User has No Transactions Yet.</Paragraph>
                          </Flex>
                        </CardBody>
                      </Card>
                    ) : (
                      <Grid className="mb-20" xl="1fr 1fr">
                        <>
                          {data?.data.data.transactions.map(
                            (item: ITransactionsResponse, index: number) => (
                              <Link
                                href={{
                                  pathname: "/transactions/[id]",
                                  query: { id: item._id },
                                }}
                                key={index}
                              >
                                <a>
                                  <Card bgColor="cream">
                                    <CardBody>
                                      <Flex>
                                        <Paragraph weight="w600">
                                          Client Name :
                                        </Paragraph>
                                        <Paragraph>{item.client}</Paragraph>
                                      </Flex>
                                      <Flex>
                                        <Paragraph weight="w600">
                                          Client Occupation :
                                        </Paragraph>
                                        <Paragraph>{item.occupation}</Paragraph>
                                      </Flex>
                                      <Flex>
                                        <Paragraph weight="w600">
                                          Client Gender :
                                        </Paragraph>
                                        <Paragraph>{item.gender}</Paragraph>
                                      </Flex>
                                    </CardBody>
                                  </Card>
                                </a>
                              </Link>
                            )
                          )}
                        </>
                      </Grid>
                    )}
                  </>
                )}
              </>
            </CardBody>
          </Card>
        </>
      )}
    </AppLayout>
  );
};

export default TeamDetails;
