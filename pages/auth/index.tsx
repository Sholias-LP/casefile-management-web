import React from 'react'
import { Grid, Card, CardBody, Tabs, Tab } from 'truparse-lodre'
import AppLayout from '../../components/appLayout'
import Login from './login'
import Register from './register'

const AuthView = () => {
  return (
    <AppLayout>
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
            <Tabs centered>
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
    </AppLayout>

  )
}

export default AuthView