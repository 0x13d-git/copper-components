import {cc} from '../../index'

const _cc = new cc(params);

// console.log(awsAmplify)
_cc.amplify.API.configure({
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:ec3d9d91-2de7-486a-8229-ffab1ceb29db",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_BazSLcJ9F",
    "aws_user_pools_web_client_id": "6a5knots08ne62gbgprhgp0ug0",
    "oauth": {},
    API: {
        endpoints: [
            {
                name: "MyAPIGatewayAPI",
                endpoint: "https://utj5x5mki5.execute-api.us-east-1.amazonaws.com/dev"
            }
        ]
    }
});

_cc.logger.state.isEnabled = true

export default _cc