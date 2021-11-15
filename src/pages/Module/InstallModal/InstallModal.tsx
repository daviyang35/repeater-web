import React from "react";
import {Form, Input, Modal} from "antd";

export interface InstallModalParams {
    appName: string;
    ip: string;
}

export interface InstallModalProps {
    visible: boolean;
    onCreate: (values: InstallModalParams) => void;
    onCancel: () => void;
}

const InstallModal: React.FC<InstallModalProps> = ({
                                                       visible,
                                                       onCreate,
                                                       onCancel,
                                                   }) => {
    const [form] = Form.useForm();

    return (
        <Modal visible={visible} title="安装模块" okText="安装" cancelText="取消"
               onOk={() => {
                   form.validateFields()
                       .then((values) => {
                           form.resetFields();
                           onCreate(values);
                       })
                       .catch(err => {
                           console.log(err);
                       });
               }}
               onCancel={onCancel}
        >
            <Form form={form}>
                <Form.Item label="应用" name="appName" rules={[{required: true, message: "必填项"}]}>
                    <Input autoComplete="off" placeholder="请输入应用名"/>
                </Form.Item>
                <Form.Item label="机器" name="ip"
                           rules={[{
                               required: true,
                               pattern: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
                               message: "非法的IP",
                           }]}>
                    <Input autoComplete="off" placeholder="请输入 IP"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default InstallModal;
