import { Alert } from 'antd';
const alertReducer = (_: any, action: any) => {
    switch (action.type) {
        case 'success':
            return (<Alert message={action.message} type="success" showIcon closable/>)
        case 'error':
            return (<Alert message={action.message} type="error" showIcon closable/>)
        case 'hide':
            return null;
        default:
            return null;
    }
}

export default alertReducer;