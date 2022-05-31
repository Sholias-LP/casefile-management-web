import React from 'react'
import { Grid, Card, CardBody, Tabs, Tab } from 'truparse-lodre'
import AppLayout from '../../../components/appLayout'
import ChangePassword from './changePassword'
import UserProfile from './user'

const Profile = () => {
  return (
    <AppLayout>
      <Grid
        xl="600px"
        lg="600px"
        md="500px"
        sm="1fr"
        justifyContent="center"
        alignItems="center"
      >
        <Card>
          <CardBody>
            <Tabs centered>
              <Tab title="Profile">
                <UserProfile />
              </Tab>

              <Tab title="Change Password">
                <ChangePassword />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </Grid>
    </AppLayout>

  )
}

export default Profile