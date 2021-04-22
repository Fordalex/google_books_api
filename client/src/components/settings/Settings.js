import React from 'react'
import { removeAccount } from '../../actions/auth';
import { connect } from "react-redux";
import PropTypes from "prop-types";


const Settings = ({removeAccount, profile: {profile}}) => {

    return (
        <div>
           <button class="btn-danger" onClick={() => removeAccount({id: profile.user._id})}>Remove Account</button>
        </div>
    )
}

Settings.prototype = {
    removeAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
})

export default connect(mapStateToProps, {removeAccount})(Settings);