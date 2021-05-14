import React, {useEffect} from 'react'
import { connect } from "react-redux";
import {getAdminData} from "../../actions/admin"
import PropTypes from "prop-types";


const AdminPage = ({getAdminData, admin_data}) => {

    useEffect(async ()  =>  {
        getAdminData()
    },[getAdminData])

    admin_data = admin_data[0]

    return (
        <div class="p-2">
          <h1>Admin Page</h1>
          <hr/>
          <h3>Total</h3>
          <table class="genres-table">
              <tr>
                  <th>Users</th>
                  <th>Books</th>
              </tr>
              <tr>
                  <td>{admin_data?.users.length}</td>
                  <td>{admin_data?.books.length}</td>
              </tr>
          </table>
          <h3>Users</h3>
          <table class="genres-table">
              <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
              </tr>
                {admin_data?.users.map((user, index) => {
                    return (
                        <tr>

                            <td>{index+1} :: {user?.email}</td>
                            <td>{user?.firstName}</td>
                            <td>{user?.lastName}</td>
                        </tr>
                    )
                })}
          </table>
        </div>
    )
}

AdminPage.propTypes = {
    getAdminData: PropTypes.func.isRequired,
    admin_data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    admin_data : state.admin
})

export default connect(mapStateToProps, {getAdminData})(AdminPage);