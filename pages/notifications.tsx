import { AxiosError, AxiosResponse } from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  Paragraph,
  SmallText,
} from "truparse-lodre";
import AppLayout from "../components/appLayout";
import NotificationIcon from "../components/assets/notification.svg";
import NotificationMenu from "../components/notificationMenu";
import { ICasefilesResponse } from "../interfaces/casefiles";
import { IResponse } from "../interfaces/response";
import { ITransactionsResponse } from "../interfaces/transactions";
import { INotificationResponse } from "../interfaces/user";
import {
  useReadNotifications,
  useUnReadNotifications,
} from "./api/mutations/notification";
import { useGetCaseFiles } from "./api/queries/caseFiles";
import { useGetNofications } from "./api/queries/notification";
import { useGetTransactions } from "./api/queries/transactions";
import { DeleteNotification } from "./api/services/notifications";

const Notifications = () => {
  const router = useRouter();
  const { data: casefiles } = useGetCaseFiles();
  const { data: transactions } = useGetTransactions();
  const { mutate: readNotification } = useReadNotifications();
  const { mutate: unReadNotification } = useUnReadNotifications();
  const { data: notificationData, refetch, isLoading } = useGetNofications();
  const [notificationsData, setNotificationData] = useState<string[]>([]);
  const [clickedItem, setItem] = useState<string>("");
  const [checkedId, setcheckedId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    if (clickedItem) {
      transactions?.data.data.map((item: ITransactionsResponse) => {
        if (clickedItem === item._id) {
          router.push(`/transactions/${clickedItem}`);
        }
      });
      casefiles?.data.data.map((item: ICasefilesResponse) => {
        if (clickedItem === item._id) {
          router.push(`/casefiles/${clickedItem}`);
        }
      });
    }
  }, [clickedItem, casefiles, transactions, router]);

  const handleCheckBoxChange = (id: string) => {
    if (checkedId.indexOf(id) !== -1) {
      setcheckedId(checkedId.filter((checkId: string) => checkId !== id));
    } else {
      setcheckedId([...checkedId, id]);
    }
  };

  const handleSelectAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked && notificationData) {
      setcheckedId(notificationData.data.data.map((item) => item._id));
      setNotificationData(notificationData.data.data.map((item) => item._id));
    } else {
      setcheckedId([]);
    }
  };

  const submitReadNotification = async () => {
    readNotification(
      { notificationIds: checkedId },
      {
        onSuccess: async (
          response: AxiosResponse<IResponse<INotificationResponse>>
        ) => {
          const { data } = response;
          toast.success(data.message!);
          refetch();
          setcheckedId([]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setLoading(false);
            toast.error(error.response?.data.message);
            setcheckedId([]);
          }
        },
      }
    );
  };

  const submitUnReadNotification = async () => {
    unReadNotification(
      { notificationIds: checkedId },
      {
        onSuccess: async (
          response: AxiosResponse<IResponse<INotificationResponse>>
        ) => {
          const { data } = response;
          toast.success(data.message!);
          refetch();
          setcheckedId([]);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setLoading(false);
            toast.error(error.response?.data.message);
            setcheckedId([]);
          }
        },
      }
    );
  };

  const deleteNotifications = async () => {
    setLoading(true);
    const res = await DeleteNotification(checkedId);
    if (res) {
      setLoading(false);
      refetch();
      setcheckedId([]);
    }
  };

  return (
    <AppLayout>
      {isLoading ? (
        <Card className="h-100">
          <CardBody className="h-100">
            <Flex justifyContent="center">
              <LoaderIcon style={{ width: "100px", height: "100px" }} />
            </Flex>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card bgColor="grey" className="mb-5">
            <CardBody>
              <Flex alignItems="center">
                <input
                  type="checkbox"
                  onChange={handleSelectAllCheckbox}
                  checked={checkedId.length !== 0}
                />
                {checkedId.length > 0 ? (
                  <Grid
                    gap={0}
                    alignItems="center"
                    xl="1fr 1fr 1fr 1fr"
                    lg="1fr 1fr 1fr 1fr"
                    md="1fr 1fr 1fr 1fr"
                    sm="1fr 1fr 1fr"
                    xs="1fr 1fr"
                  >
                    <Flex alignItems="center">
                      <Paragraph>{checkedId.length} selected</Paragraph>
                      <button
                        onClick={deleteNotifications}
                        disabled={loading}
                        className="notificationButton"
                      >
                        Delete
                      </button>
                    </Flex>
                    <NotificationMenu>
                      <ul style={{ cursor: "pointer" }}>
                        <li>
                          <SmallText onClick={submitReadNotification}>
                            Mark as Read
                          </SmallText>
                        </li>
                        <li>
                          <SmallText onClick={submitUnReadNotification}>
                            Mark as Unread
                          </SmallText>
                        </li>
                      </ul>
                    </NotificationMenu>
                  </Grid>
                ) : (
                  <div style={{ alignItems: "center", display: "flex" }}>
                    <label style={{ fontSize: "12px", marginLeft: "5px" }}>
                      Select All
                    </label>
                  </div>
                )}
              </Flex>
            </CardBody>
          </Card>
          <>
            {notificationData && notificationData.data.data.length > 0 ? (
              notificationData.data.data.map(
                (item: INotificationResponse, index: number) => (
                  <>
                    <Card
                      className="mb-5"
                      bgColor={item.status === "read" ? "light" : "cream"}
                      key={index}
                      style={{
                        borderLeft:
                          item.status === "read" ? "" : "4px solid #FFC20E",
                      }}
                    >
                      <Grid
                        xl="30px 1fr"
                        lg="30px 1fr"
                        md="30px 1fr"
                        sm="15px 1fr"
                        xs="15px 1fr"
                      >
                        <CardBody>
                          <div>
                            <input
                              type="checkbox"
                              value={item._id}
                              onChange={(e) =>
                                handleCheckBoxChange(e.target.value)
                              }
                              checked={checkedId.includes(item._id)}
                            />
                          </div>
                        </CardBody>
                        <CardBody
                          onClick={() => setItem(item.resourceId)}
                          style={{ cursor: "pointer" }}
                        >
                          <Grid
                            xl="1fr auto"
                            lg="1fr auto"
                            md="1fr auto"
                            sm="1fr auto"
                            xs="1fr auto"
                          >
                            <Flex gap={0.2}>
                              <SmallText
                                onClick={() =>
                                  router.push(`/team/${item.userId}`)
                                }
                                weight={"w600"}
                              >
                                {item.user}
                              </SmallText>
                              <SmallText>{item.activity}</SmallText>
                            </Flex>
                            <Flex justifyContent="end">
                              <SmallText>{timeAgo.format(item.date)}</SmallText>
                            </Flex>
                          </Grid>
                        </CardBody>
                      </Grid>
                    </Card>
                  </>
                )
              )
            ) : (
              <Card className="h-100">
                <CardBody className="h-100 pt-50 pb-50">
                  <Flex justifyContent="center">
                    <NotificationIcon
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Flex>
                  <Flex justifyContent="center">
                    <Paragraph weight="w600">No Notifications yet</Paragraph>
                  </Flex>
                </CardBody>
              </Card>
            )}
          </>
        </>
      )}
    </AppLayout>
  );
};

export default Notifications;
