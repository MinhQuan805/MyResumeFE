import { useEffect, useState } from 'react';
import api from '../../../config/api.ts';
import type { ArticleType, ArticleResponse } from '../../../types/article.type.ts';
import { Table, Form, Radio, Badge, Button, Popconfirm, Input } from 'antd';
import type { TableProps, RadioChangeEvent } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { SortOrder } from 'antd/es/table/interface';

import Action from '../../../components/Action.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { displayAlert } from '../../../redux/action/alert.tsx';
import AlertInfo from '../../../components/AlertInfo.tsx';
import { PlusOutlined } from '@ant-design/icons';
import { FaTrash } from 'react-icons/fa';
import './article.css';
import { useNavigate } from 'react-router-dom';

type SizeType = TableProps['size'];

function Article() {
  const [article, setArticle] = useState<ArticleResponse>();
  const [size, setSize] = useState<SizeType>('large');
  const [loading, setLoading] = useState(false);
  const [haveSelected, setHaveSelected] = useState(false);
  const alert = useSelector((state: any) => state.alert);
  const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const res = await api.get<ArticleResponse>('/admin/article');
      setArticle(res.data);
    } catch (err: any) {
      dispatch(displayAlert(err.response?.data?.message || 'Lỗi không xác định', 'error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const rowSelection: TableRowSelection<ArticleType> = {
    selectedRowKeys: rowSelected,
    onChange: (selectedRowKeys: React.Key[]) => {
      setRowSelected(selectedRowKeys);
      setHaveSelected(selectedRowKeys.length > 0);
    },
  };

  const handleDeleteSelected = async () => {
    if (rowSelected.length === 0) {
      dispatch(displayAlert('Vui lòng chọn bài viết để xóa', 'error'));
      return;
    }
    try {
      for (let id of rowSelected) {
        await api.delete(`/admin/article/deleteSoft/${id}`);
      }
      dispatch(displayAlert('Xóa bài viết thành công', 'success'));
      fetchAPI();
      setRowSelected([]);
      setHaveSelected(false);
    } catch (err: any) {
      dispatch(displayAlert(err.response?.data?.message || 'Lỗi khi xóa bài viết', 'error'));
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: ArticleType, b: ArticleType) => a.title.localeCompare(b.title),
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      sorter: (a: ArticleType, b: ArticleType) => a.position - b.position,
      sortDirections: ['descend'] as SortOrder[],
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'introduction',
      key: 'introduction',
      className: 'introduction-column',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Không hoạt động', value: 'inactive' },
        { text: 'Đang hoàn thành', value: 'ongoing' },
      ],
      filterSearch: true,
      onFilter: (value: any, record: ArticleType) => record.status === value,
      render: (_: any, record: ArticleType) => {
        let color = 'gray';
        let text = 'Không xác định';
        if (record.status === 'active') {
          color = 'green';
          text = 'Hoạt động';
        } else if (record.status === 'inactive') {
          color = 'red';
          text = 'Không hoạt động';
        } else {
          color = 'blue';
          text = 'Đang hoàn thành';
        }
        return <Badge color={color} text={text} />;
      },
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: '10%',
      render: (_: any, record: ArticleType) => (
        <Action record={record} onChangeData={fetchAPI} action_url="/admin/article" recovery={false} />
      ),
    },
  ];

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const handleSearch = async (value: string) => {
    try {
      const response = await api.get<ArticleResponse>(`/admin/article?keyword=${value}`);
      setArticle(response.data);
      setRowSelected([]);
      setHaveSelected(false);
    } catch (err: any) {
      dispatch(displayAlert('Không thể tìm kiếm', 'error'));
    }
  };

  return (
    <>
      <div className="btn-controller">
        <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 0 }}>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>

        <div className="btn-action-container">
          <Input.Search
            placeholder="Tìm kiếm"
            variant="underlined"
            style={{ width: 200 }}
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Button
            style={{ color: '#006effff', marginLeft: 20, borderRadius: 45, border: '1px solid #006effff' }}
            size="middle"
            icon={<PlusOutlined />}
            onClick={() => navigate('/admin/article/create')}
          >
            <span className="btn-text">Tạo bài viết mới</span>
          </Button>

          <Button
            style={{ color: 'black', marginLeft: 20, borderRadius: 40, border: '1px solid black' }}
            size="middle"
            icon={<FaTrash />}
            onClick={() => navigate('/admin/article/trash')}
          >
            <span className="btn-text">Thùng rác</span>
          </Button>
        </div>

        {haveSelected && (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài viết đã chọn?"
            onConfirm={handleDeleteSelected}
          >
            <Button
              style={{ color: 'red', marginLeft: 20, borderRadius: 40, border: '1px solid rgb(255, 0, 0)' }}
              size="middle"
              icon={<FaTrash />}
            >
              <span className="btn-text">Xóa</span>
            </Button>
          </Popconfirm>
        )}

        <AlertInfo alert={alert} />
      </div>

      <Table
        size={size}
        loading={loading}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          responsive: true,
          size: 'default',
          style: { fontSize: 18, padding: 16 },
        }}
        dataSource={article?.data}
        columns={columns}
        rowKey="_id"
      />
    </>
  );
}

export default Article;