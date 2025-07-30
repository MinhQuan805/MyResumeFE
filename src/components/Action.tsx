import { Button, Menu, Dropdown, Popconfirm } from 'antd';
// Icon
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrashRestore } from '@fortawesome/free-solid-svg-icons';

import api from '../config/api';
import { useDispatch } from 'react-redux';
import { displayAlert } from '../redux/action/alert';
import { useNavigate } from 'react-router-dom';
export type ActionProps<T> = {
  record: T & { _id: string };
  onChangeData: () => void;
  action_url: string;
  recovery: boolean;
};


function Action<T>({ record, onChangeData, action_url, recovery = false}: ActionProps<T>) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Xử lý xóa mềm
    const handleDeleteSoft = async () => {
        const response = await api.delete(`${action_url}/deleteSoft/${record._id}`);
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        onChangeData();
    }

    // Xử lý xóa vĩnh viễn
    const handleDeleteHard = async () => {
        const response = await api.delete(`${action_url}/deleteHard/${record._id}`);
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        onChangeData();
    }

    // Xử lý phục hồi file
    const handleRecovery = async () => {
        const response = await api.patch(`${action_url}/recovery/${record._id}`);
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        onChangeData();
    }

    // Xử lý phần update
    const handleUpdate = async () => {
        navigate(`${action_url}/update`, {state: {record}});
    }

    // Xử lý phần edit
    const handleDetail = async () => {
        const response = await api.get(`${action_url}/detail/${record._id}`);
        console.log(response.data);
    }
    return (
        <>
            {/* Sử dụng Dropdown với nút 3 chấm dọc, khi bấm sẽ hiện các hành động */}
            <Dropdown
                trigger={['click']}
                overlay={
                    <Menu style={{minWidth: 120 }}>
                        {!recovery ? (
                            <>
                                {(action_url !== "/user") ? (
                                    <Menu.Item key="detail" onClick={handleDetail}>
                                        <FontAwesomeIcon icon={faInfo} style={{ color: 'green', marginRight: 15 }} />
                                        Chi tiết
                                    </Menu.Item>
                                ) : null}
                                <Menu.Item key="update" onClick={handleUpdate}>
                                    <EditOutlined style={{ color: 'yellow', marginRight: 8 }} />
                                    Sửa
                                </Menu.Item>
                                <Menu.Item key="delete" danger>
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa?"
                                        onConfirm={action_url === '/user' ? handleDeleteHard : handleDeleteSoft}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <span>
                                            <DeleteOutlined style={{ color: 'red', marginRight: 8 }} />
                                            Xóa
                                        </span>
                                    </Popconfirm>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item key="deleteHard" danger>
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa vĩnh viễn?"
                                        onConfirm={handleDeleteHard}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <span>
                                            <DeleteOutlined style={{ color: 'red', marginRight: 8 }} />
                                            Xóa vĩnh viễn
                                        </span>
                                    </Popconfirm>
                                </Menu.Item>
                                <Menu.Item key="recovery" onClick={handleRecovery}>
                                    <FontAwesomeIcon icon={faTrashRestore} style={{ color: 'green', marginRight: 8 }} />
                                    Phục hồi
                                </Menu.Item>
                            </>
                        )}
                    </Menu>
                }
            >
                <Button
                    type="text"
                    icon={<MoreOutlined style={{ fontSize: '20px'}} />}
                    style={{
                        border: 'none',
                        boxShadow: 'none',
                        color: 'black',
                        outline: 'none',
                        padding: 0,
                        background: 'transparent',
                        }}
                />
            </Dropdown>
        </>
    )
}
export default Action;