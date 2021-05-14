import React from 'react'
import { connect } from "react-redux";


const Admin = ({ profile: {profile}}) => {

    return (
        <div>
          <p>This is the admin page.</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile,
})

export default connect(mapStateToProps, null)(Admin);