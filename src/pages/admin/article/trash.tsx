import { useEffect, useState } from "react";
import api from "../../../config/api";
import type { ArticleResponse } from "../../../types/article.type";
import { displayAlert } from "../../../redux/action/alert";
import { useDispatch, useSelector } from "react-redux";
import type { ArticleType } from "../../../types/article.type";
import { Button, Form, Popconfirm, Radio, Table, type RadioChangeEvent, type TableProps } from "antd";
import AlertInfo from "../../../components/AlertInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import './article.css';
import Action from "../../../components/Action";
import { useNavigate } from "react-router-dom";

type SizeType = TableProps['size'];
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

function Trash() {
    const dispatch = useDispatch();
    const [article, setArticle] = useState<ArticleResponse>();
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState<SizeType>('middle');
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const alert = useSelector((state: any) => state.alert);
    const navigate = useNavigate();
    const fetchAPI = async () => {
        api.get<ArticleResponse>('/admin/article', { params: { deleted: true } })
        .then(res => {setArticle(res.data);})
        .catch(err => {
            dispatch(displayAlert(err.response.data.message, 'error'));
        })
        .finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchAPI();
    }, [])

    const rowSelection: TableRowSelection<ArticleType> = {
        selectedRowKeys: rowSelected,
        onChange: (selectedRowKeys: React.Key[]) => {
            setRowSelected(selectedRowKeys);
        },
      };

    // Xử lý xóa vĩnh viễn bài viết đã chọn
    const handleDeleteSelected = async () => {
        if (rowSelected.length === 0) {
            dispatch(displayAlert('Vui lòng chọn bài viết để xóa', 'error'));
            return;
        }
        let response = await api.delete(`/admin/article/deleteHard/${rowSelected[0]}`);
        if (response.data.success) {
            for (let i = 1; i < rowSelected.length; i++) {
                response = await api.delete(`/admin/article/deleteHard/${rowSelected[i]}`);
            }
        }
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        fetchAPI();
    }

    // Xử lý phục hồi bài viết đã chọn
    const handleRecoverySelected = async () => {
        if (rowSelected.length === 0) {
            dispatch(displayAlert('Vui lòng chọn bài viết để phục hồi', 'error'));
            return;
        }
        let response = await api.patch(`/admin/article/recovery/${rowSelected[0]}`);
        if (response.data.success) {
            for (let i = 1; i < rowSelected.length; i++) {
                response = await api.patch(`/admin/article/recovery/${rowSelected[i]}`);
            }
        }
        dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
        fetchAPI();
    }

    const handleSizeChange = (e: RadioChangeEvent) => {
        setSize(e.target.value);
    };
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            width: '35%',
            key: 'title',
            sorter: (a: ArticleType, b: ArticleType) => a.title.localeCompare(b.title),
        },
        {
            title: 'Giới thiệu',
            dataIndex: 'introduction',
            key: 'introduction'
        },
        {
            title: "Hành động",
            key: "actions",
            width: '10%',
            render: (_: any, record: ArticleType) => {
                return <Action record={record} onChangeData={fetchAPI} action_url="/admin/article" recovery={true}/>
            }
        }
    ]
    const tableProps: TableProps<ArticleType> = {
        size,
        columns,
        dataSource: article?.data,
        rowKey: '_id',
        loading,
    }
    return (
        <>  
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
                <Button onClick={() => navigate('/admin/article')} style={{ borderRadius: 90, color: 'black', border: '0.5px solid rgb(112, 112, 112)', outline: 'none', background: 'transparent'}} icon={<FontAwesomeIcon icon={faArrowLeft} />}></Button>  
                <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 0 }}>
                    <Form.Item label="Size">
                        <Radio.Group value={size} onChange={handleSizeChange}>
                            <Radio.Button value="large">Large</Radio.Button>
                            <Radio.Button value="middle">Middle</Radio.Button>
                            <Radio.Button value="small">Small</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <Popconfirm title="Bạn có chắc chắn muốn xóa vĩnh viễn bài viết đã chọn?" onConfirm={() => handleDeleteSelected()}>
                    <Button style={{ color: 'red', marginLeft: 20, borderRadius: 40, border: '1px solid rgb(255, 0, 0)'}} 
                        size="middle" icon={<FontAwesomeIcon icon={faTrash} />} >
                        <span className="btn-text">Xóa</span></Button>
                </Popconfirm>
                <Button onClick={handleRecoverySelected} 
                        style={{ borderRadius: 45, color: 'green', border: '1px solid #00ff4cff'}} 
                        size="middle" icon={<FontAwesomeIcon icon={faTrashRestore} />}>Phục hồi</Button>
                <AlertInfo alert={alert}/>
            </div>
            <Table {...tableProps} loading={loading} rowSelection={rowSelection} 
                pagination={{ pageSize: 10, responsive: true, size: "default", style: { fontSize: 18, padding: 16 } }} 
                dataSource={article?.data} columns={columns} rowKey="_id"/>
        </>
    )
}

export default Trash;