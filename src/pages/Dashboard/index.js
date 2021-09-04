import { fetchUsers } from "actions/user";
import React, { Component, useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Col,
  Container, Row,
} from "reactstrap"
import UserCard from "./UserCard";

export default function Dashboard() {

  const [users, setUsers] = useState([])
  useEffect(() => {
    fetchUsers()
      .then(response => {
        setUsers(response)
        console.log(response, "users")
      })
      .catch(err => {

      })

  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Row>

            {
              users.map(user => (
                <UserCard key={user.id} user={user}/>
              ))
            }
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
