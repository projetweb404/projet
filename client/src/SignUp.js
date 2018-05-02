import React, {Component} from 'react';
import SignupForm from './SignupForm';

class SignUp extends Component {

    render() {
        const { userSignupRequest } = this.props;

        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4"> {/* ?????? */}
                    <SignupForm userSignupRequest={userSignupRequest}/>
                </div>
            </div>
        )
    }
}

export default SignUp;