import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { getCurrentUserData, updateUserProfile } from "actions/user"

const UserProfile = props => {
  const dispatch = useDispatch()

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username)
        setemail(obj.email)
        setidx(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  const currentUser = getCurrentUserData()

  const [loading, setLoading] = useState(false)
  const [successAlert , setSuccessAlert] = useState(null)

  function handleValidSubmit(event, values) {
    setLoading(true)
    setSuccessAlert(null)
    updateUserProfile(currentUser.user.id, values)
      .then(response => {
        setSuccessAlert('Profile updated')
      })
      .catch(err => {

      })
      .finally(() => setLoading(false))
  }



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <Media>
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <Media body className="align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{currentUser.user.id}</p>
                      </div>
                    </Media>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Full Name</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <AvField
                    name="fullname"
                    label="Fullname Name"
                    value={currentUser.user.fullname}
                    className="form-control"
                    placeholder="Enter Full Name"
                    type="text"
                    required
                  />

                  <AvField
                    name="city"
                    label="City"
                    value={currentUser.user.city}
                    className="form-control"
                    placeholder="Enter City"
                    type="text"
                    required
                  />

                  <AvField
                    name="country"
                    label="Country"
                    value={currentUser.user.country}
                    className="form-control"
                    placeholder="Enter Country"
                    type="text"
                    required
                  />


                  <AvField name="idx" value={idx} type="hidden" />
                </div>

                {successAlert ? <Alert className="mt-2" color="primary">{successAlert}</Alert> : null}
                <div className="text-center mt-4">
                  <Button disabled={loading} type="submit" color="danger">
                    Update User
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
