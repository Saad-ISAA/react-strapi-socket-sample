import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"
import { getCurrentUserData } from "actions/user"
import { SocketClient } from "config/socket"
import { getUserNotifications } from "actions/notification"
import toastr from "toastr"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const currenUser = getCurrentUserData()

  const [notifications, setNotifications] = useState([])
  const [newArrived, setNewArrived] = useState(false)

  useEffect(() => {
    getUserNotifications()
      .then(response => {
        setNotifications(response)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {

    if (SocketClient.socket) {
      console.log(SocketClient.socket)
      SocketClient.socket.on(`my_notification_${currenUser.user.id}`, (data) => {
        console.log("RECEIVED NEW NOTIFICATION");
        console.log(data);

        setNewArrived(true)
        setNotifications([data, ...notifications])

      });
    }
  }, [currenUser, notifications, SocketClient.socket])

  useEffect(() => {
    if (newArrived)
      toastr.success("Someone Liked your Profile", "Profile Like")

  }, [newArrived])
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
          onClick={() => setNewArrived(false)}
        >
          <i className="bx bx-bell bx-tada" />
          {newArrived ? <span className="badge bg-danger rounded-pill">New</span> : null}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {
              notifications.map(n => (
                <Link key={n.id} to="" className="text-reset notification-item">
                  <div className="media">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i className="bx bx-cart" />
                      </span>
                    </div>
                    <div className="media-body">
                      <h6 className="mt-0 mb-1">
                        {n.title}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          {n.body}
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          { }{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }


          </SimpleBar>
          <div className="p-2 border-top d-grid">

          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}