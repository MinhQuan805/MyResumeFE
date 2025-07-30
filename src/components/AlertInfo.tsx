import { useEffect, useState } from "react";
import { displayAlert } from "../redux/action/alert";
import { useDispatch } from "react-redux";

function AlertInfo(props: any) {
    const { alert } = props;
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Reset alert khi chuyển route
        dispatch(displayAlert('', 'hide'));
    }, [location.pathname]);

    useEffect(() => {
        if (alert) {
            setShow(true);
            const timer = setTimeout(() => {
                dispatch(displayAlert('', 'hide'));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert, dispatch]);

    if (!show) return null;

    return (
        <div style={{ height: 30, marginLeft: 100, position: 'fixed',
            top: 25,
            right: 25,
            zIndex: 9999 }}>
            {alert}
        </div>
    );
}

export default AlertInfo;