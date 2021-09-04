
import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    Card,
    CardBody,
    CardFooter,
    Col,
    UncontrolledTooltip,
} from "reactstrap"
import images from "assets/images"
import { isEmpty, size, map } from "lodash"
import PropTypes from "prop-types"
import { getCurrentUserData, likeUserProfile } from "actions/user"

const UserCard = ({ user }) => {

    const currentUser = getCurrentUserData()
    const [alreadyLiked, setAlreadyLiked] = useState(false)

    const onLikeClick = () => {

        console.log('clicked')
        likeUserProfile(user.id)
            .then(response => {
                console.log('then' , alreadyLiked)
                setAlreadyLiked(true)
            })
            .catch(err => {

            })
    }

    useEffect(() => {
        const likeFound = user.liked_by.find(like => like.id == currentUser.user.id)

        if (likeFound)
            setAlreadyLiked(true)
        else
            setAlreadyLiked(false)
    }, [user, currentUser])



    return (
        <React.Fragment>
            <Col sm="3">
                <Card className="text-center">
                    <CardBody>

                        <div className="avatar-sm mx-auto mb-4">
                            <span
                                className={
                                    "avatar-title rounded-circle bg-soft bg-yellow text-yellow font-size-16"
                                }
                            >
                                {user.fullname.slice(0, 1).toUpperCase()}
                            </span>
                        </div>


                        <h5 className="font-size-15 mb-1">
                            <Link to="#" className="text-dark">
                                {user.fullname}
                            </Link>
                        </h5>
                        <p className="text-muted"></p>

                        <div>

                            <Link
                                to="#"
                                className="badge bg-primary font-size-11 m-1"
                            >
                                {user.city}
                            </Link>

                            <Link
                                to="#"
                                className="badge bg-primary font-size-11 m-1"
                            >
                                {user.country}
                            </Link>


                        </div>
                    </CardBody>
                    <CardFooter className="bg-transparent border-top">
                        <div className="contact-links d-flex font-size-20">
                            <div className="flex-fill">
                                <Link to="#" id={"message"}>
                                    {
                                        alreadyLiked ? "Liked" :
                                            <i className="bx bx-like" onClick={onLikeClick} />
                                    }
                                    <UncontrolledTooltip
                                        placement="top"
                                        target={"message"}
                                    >
                                        Like
                                    </UncontrolledTooltip>
                                </Link>
                            </div>
                            {/* <div className="flex-fill">
                                <Link to="#" id={"project"}>
                                    <i className="bx bx-pie-chart-alt" />
                                    <UncontrolledTooltip
                                        placement="top"
                                        target={"project"}
                                    >
                                        Projects
                                    </UncontrolledTooltip>
                                </Link>
                            </div>
                            <div className="flex-fill">
                                <Link to="#" id={"profile"}>
                                    <i className="bx bx-user-circle" />
                                    <UncontrolledTooltip
                                        placement="top"
                                        target={"profile"}
                                    >
                                        Profile
                                    </UncontrolledTooltip>
                                </Link>
                            </div> */}
                        </div>
                    </CardFooter>
                </Card>
            </Col>
        </React.Fragment>
    )
}

UserCard.propTypes = {
    user: PropTypes.object
}


export default UserCard
