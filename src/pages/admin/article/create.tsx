import React, { useRef, useState } from 'react';
import { Button, Col, DatePicker,
        Form, Input, Radio, Row, 
        Switch, Upload, InputNumber } from 'antd';
import type { UploadProps, UploadFile } from 'antd/es/upload/interface';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import TextEditor from '../../../components/TextEditor';
import api from '../../../config/api';
import { displayAlert } from '../../../redux/action/alert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './article.css';

const CreateArticle: React.FC<{action_url: string}> = ({action_url}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any[]>([]);

  // Upload ảnh
  const onChange: UploadProps['onChange'] = ({file, fileList: newFileList }) => {
    if (file.status === 'done' && file.response) {
      file.url = file.response.url;
    }
    setFileList(newFileList);
  };

  // Xem ảnh
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // Upload ảnh lên Cloudinary
  const customUpload = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post(`${action_url}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSuccess(response.data as any, file as any);
    } catch (err) {
      onError(err as any);
    }
  }

  // Lấy trạng thái
  const options: CheckboxGroupProps<string>['options'] = [
    { label: 'Hoạt động', value: 'active' },
    { label: 'Không hoạt động', value: 'inactive' },
    { label: 'Đang hoàn thành', value: 'ongoing' },
  ];
  // Form
  const [form] = Form.useForm();

  // Truyền vào để lấy dữ liệu content
  const editorRef = useRef<any>(null);


  // Tạo bài báo mới
  const CreateNew = async () => {
    const createdAt = form.getFieldValue('createdAt');
    const data = {
      title: form.getFieldValue('title'),
      thumbnail: fileList[0]?.url,
      outstand: form.getFieldValue('outstand'),
      introduction: form.getFieldValue('introduction'),
      content: editorRef.current.getContent(),
      position: form.getFieldValue('position'),
      status: form.getFieldValue('status'),
      createdAt: createdAt ? createdAt.toDate() : new Date(),
    }
    const response = await api.post(`${action_url}/create`, data);
    //Quay lại lúc đâu
    if (response.data.success) {
      form.resetFields(); 
      navigate(action_url);
      dispatch(displayAlert(response.data.message, response.data.success ? 'success' : 'error'));
    }
    else {
      navigate(action_url);
      dispatch(displayAlert(response.data.message, 'error'));
    }
  };


  return (
    <>
      <Form layout="vertical" form={form} onFinish={CreateNew}
            initialValues={{ status: 'ongoing', outstand: false }}>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 20}}>
            <Button onClick={() => navigate(action_url)} style={{outline: 'none', background: 'transparent', border: '1px solid rgb(112, 112, 112)'}}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Tạo bài báo
            </Button>
          </div>
          <Row gutter={16} style={{marginBottom: 10}}>
            <Col span={12}>
              <Form.Item name="title" label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input placeholder="Nhập tiêu đề" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="position" label="Vị trí" style={{marginLeft: 100, width: '30%'}}>
                <InputNumber placeholder="Nhập vị trí" style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{marginBottom: 10}}>
            <Col span={24}>
              <Form.Item name="introduction" label="Giới thiệu">
                <Input.TextArea rows={4} placeholder="Nhập phần giới thiệu" />
              </Form.Item>
            </Col>
          </Row>

          {/* Upload ảnh */}
          <Row gutter={16} style={{marginBottom: 10}}>
            <Col span={12}>
              <Form.Item name="thumbnail" label="Ảnh bìa">
                <Upload
                  customRequest={customUpload}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                  style={{ width: '150px', height: '150px' }}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="createdAt" label="Ngày tạo">
                <DatePicker />
              </Form.Item>
              <Form.Item name="outstand" label="Nổi bật" valuePropName="checked">
                <Switch/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{marginBottom: 10}}>
            <Col span={12}>
              <Form.Item name="status" label="Trạng thái">
                <Radio.Group block options={options} defaultValue="ongoing" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{marginBottom: 10}}>
            <Col span={24}>
              <Form.Item name="content" label="Nội dung">
                <TextEditor editorRef={editorRef} />
              </Form.Item>
            </Col>
          </Row>
      </Form>
    </>
  );
};

export default CreateArticle;