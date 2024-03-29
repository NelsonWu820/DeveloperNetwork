import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';


const Profiles = ({ getAllProfiles, profile: {profiles}}) => {
    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])
    return (
        <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
            </p>
            <div className="profiles">
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
                ))
            ) : (
                <h4>No profiles found...</h4>
            )}
            </div>
        </section>
    );
};


Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles})(Profiles);
