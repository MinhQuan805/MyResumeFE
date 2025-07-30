import { useEffect, useState } from 'react';
import api from '../../../config/api.ts';
import type { UserType, UserResponse } from '../../../types/user.type.ts';
import { Table,Form, Radio, Badge, Button, Popconfirm, Input, Modal } from 'antd';
import type { TableProps,RadioChangeEvent } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { displayAlert } from '../../../redux/action/alert.tsx';
import AlertInfo from '../../../components/AlertInfo.tsx';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './user.css';
import type { RadioGroupProps } from 'antd';
import Action from '../../../components/Action.tsx';

type SizeType = TableProps['size'];

function User() {
    const [user, setUser] = useState<UserResponse>();
    const [size, setSize] = useState<SizeType>('large');
    const [loading, setLoading] = useState(false);
    const [haveSelected, setHaveSelected] = useState(false);
    const alert = useSelector((state: any) => state.alert);
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // Lấy dữ liệu từ server
    const fetchAPI = async () => {
        api.get<UserResponse>('/user')
        .then(res => {setUser(res.data);})
        .catch(err => {
            dispatch(displayAlert(err.response.data.message, 'error'));
        })
        .finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchAPI();
    }, [])
    
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
        setLoading(false);
        }, 500);
    };

    const rowSelection: TableRowSelection<UserType> = {
        selectedRowKeys: rowSelected,
        onChange: (selectedRowKeys: React.Key[]) => {
            setRowSelected(selectedRowKeys);
            setHaveSelected(selectedRowKeys.length > 0);
        },
      };
    // Xử lý xóa bài viết đã chọn
    const handleDeleteSelected = async () => {
        if (rowSelected.length === 0) {
            dispatch(displayAlert('Vui lòng chọn người dùng để xóa', 'error'));
            return;
        }
        let response = await api.delete(`/user/delete/${rowSelected[0]}`);
        if (response.data.success) {
            for (let i = 1; i < rowSelected.length; i++) {
                response = await api.delete(`/user/delete/${rowSelected[i]}`);
            }
        }
        setRowSelected([]);
        setHaveSelected(false);
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        fetchAPI();
    }
    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: UserType, b: UserType) => a.title.localeCompare(b.title),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: "Admin", value: "admin"},
                { text: "User", value: "user"}
            ],
            filterSearch: true,
            onFilter: (value: any, record: UserType) => record.status === value,
            render: (_: any, record: UserType) => {
                let color = 'gray';
                let text = 'Không xác định';
                if (record.role === 'admin') {color = 'blue'; text = 'Admin';} 
                else if (record.role === 'client') {color = 'green'; text = 'Client';} 
                return <Badge color={color} text={text} />;
            }
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: "Hoạt động", value: "active"},
                { text: "Không hoạt động", value: "inactive"},
            ],
            filterSearch: true,
            onFilter: (value: any, record: UserType) => record.status === value,
            render: (_: any, record: UserType) => {
                let color = 'gray';
                let text = 'Không xác định';
                if (record.status === 'active') {color = 'green'; text = 'Hoạt động';} 
                else if (record.status === 'inactive') {color = 'red'; text = 'Không hoạt động';} 
                return <Badge color={color} text={text} />;
            }
        },
        {
            title: "Hành động",
            key: "actions",
            width: '10%',
            render: (_: any, record: UserType) => {
                return (
                    <Action record={record} onChangeData={fetchAPI} action_url='/user' recovery={false} />
                )
            }
        }
    ];
    const handleSizeChange = (e: RadioChangeEvent) => {
        setSize(e.target.value);
    };
    const tableProps: TableProps<UserType> = {
        size,
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const onFinish = async (data: any) => {
        const response = await api.post(`/user/create`, data);
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        if (response.data.success) {
            setOpen(false);
            form.resetFields();
            fetchAPI();
        }
    };


    // Tìm kiếm
    const handleSearch = async (value: string) => {
        const response = await api.get<UserResponse>(`/admin/user?keyword=${value}`);
        setUser(response.data);
        setRowSelected([]);
        setHaveSelected(false);
    }
    const isAction: RadioGroupProps['options'] = [
        { label: 'Hoạt động', value: 'active' },
        { label: 'Không hoạt động', value: 'inactive' },
    ];
    const isUser: RadioGroupProps['options'] = [
        { label: 'Người dùng', value: 'client' },
        { label: 'Quản trị', value: 'admin' },
    ];
    return (
        <>
            <div className='btn-controller'>
                <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 0 }}>
                    <Form.Item label="Size">
                        <Radio.Group value={size} onChange={handleSizeChange}>
                            <Radio.Button value="large">Large</Radio.Button>
                            <Radio.Button value="middle">Middle</Radio.Button>
                            <Radio.Button value="small">Small</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <div className='btn-action-container'>
                    <Input.Search placeholder="Tìm kiếm" variant="underlined" style={{ width: 200 }} 
                                onSearch={handleSearch}
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                            />
                    <Button style={{ color: '#006effff', marginLeft: 20, borderRadius: 45, border: '1px solid #006effff'}} 
                            size="middle" icon={<PlusOutlined />}
                            onClick={showLoading}><span className="btn-text">Tạo người dùng mới</span></Button>
                </div>
                {haveSelected && (
                    <Popconfirm title="Bạn có chắc chắn muốn xóa người dùng đã chọn?" 
                                onConfirm={() => handleDeleteSelected()}>
                        <Button style={{ color: 'red', marginLeft: 20, borderRadius: 40, border: '1px solid rgb(255, 0, 0)'}} 
                            size="middle" icon={<FontAwesomeIcon icon={faTrash} />} >
                            <span className="btn-text">Xóa</span></Button>
                    </Popconfirm>
                )}
                <AlertInfo alert={alert} />
            </div>
            <Modal
                title={<p>Loading Modal</p>}
                footer={
                    <>
                        <Button type="primary" onClick={showLoading}>
                            Tải lại
                        </Button>
                        <Button type="primary" htmlType="submit" form="userForm">
                            Tạo tài khoản
                        </Button>
                    </>
                }
                open={open}
                loading={loading}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    id="userForm"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        role: 'client',
                        status: 'active'
                    }}
                    >
                        <Form.Item
                            label="Tên"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
                        >
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            label="Password" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Nhập password" />
                        </Form.Item>
                        <Form.Item name="status" label="Trạng thái">
                            <Radio.Group block options={isAction} defaultValue="active" />
                        </Form.Item>
                        <Form.Item name="role" label="Vai trò">
                            <Radio.Group block options={isUser} defaultValue="client" />
                        </Form.Item>
                </Form>
            </Modal>
            <Table
                {...tableProps}
                loading={loading}
                rowSelection={rowSelection}
                size="middle"
                pagination={{
                    pageSize: 10,
                    responsive: true,
                    size: "default",
                    style: { fontSize: 18, padding: 16 },
                }}
                dataSource={user?.data}
                columns={columns}
                rowKey="_id"
            />
        </>
    )
}
export default User;