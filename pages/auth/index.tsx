import { Card, CardBody, Grid, Tab, Tabs } from "truparse-lodre";
import AuthLayout from "../../components/authLayout";
import Login from "./login";
import Register from "./register";

const AuthView = () => {
  return (
    <AuthLayout>
      <Grid
        xl="400px"
        lg="400px"
        md="400px"
        sm="1fr"
        justifyContent="center"
        alignItems="center"
      >
        <Card>
          <CardBody>
            <Tabs centered radius>
              <Tab title="Register">
                <Register />
              </Tab>

              <Tab title="Login">
                <Login />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </Grid>
    </AuthLayout>
  );
};

export default AuthView;
