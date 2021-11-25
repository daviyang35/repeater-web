import React, {useEffect, useState} from "react";
import {Form, message, Modal, Select, Switch} from "antd";
import service, {ExecuteReplayParams, ModuleInfo} from "./service";
import {useHistory} from "react-router-dom";

export interface ReplayModalParams {

}

export interface ReplayModalProps {
    appName?: string;
    traceId?: string;
    visible?: boolean;
    onReplay?: (params: ReplayModalParams) => void;
    onCancel?: () => void;
}

const ReplayModal: React.FC<ReplayModalProps> = ({appName, traceId, visible, onCancel}: ReplayModalProps) => {
    const [dataSource, setDataSource] = useState<ModuleInfo[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetch = async () => {
            if (!appName) {
                console.log("修复因路由导致的非预期执行");
                return;
            }
            const resp = await service.replayServer(appName!);
            if (!resp.success) {
                message.warn("拉取在线回放列表失败：" + resp.message);
                return;
            }

            setDataSource(resp.data as ModuleInfo[]);
        };
        void fetch();
    }, [appName]);

    const history = useHistory();

    const closeModal = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const doTheReplay = async (module: ModuleInfo, mock: boolean) => {
        const replayParams: ExecuteReplayParams = {
            mock: mock,
            appName: module.appName,
            environment: module.environment,
            ip: module.ip,
            traceId: traceId as string,
        };
        const resp = await service.executeReplay(replayParams);
        console.log(resp);

        if (resp.success) {
            closeModal();

            Modal.confirm({
                content: "回放执行成功，立即查看详情？",
                onOk: () => {
                    history.push("/replayResult?appName=" + appName + "&repeatId=" + resp.data);
                },
            });
            return;
        }

        message.error(resp.message);
    };

    return (
        <Modal visible={visible} title="执行回放" okText="回放" cancelText="取消"
               onCancel={onCancel} onOk={() => {
            form.validateFields()
                .then((values) => {
                    form.resetFields();
                    try {
                        const record: ModuleInfo = JSON.parse(values.record);
                        void doTheReplay(record, values.mock || false);
                    } catch (e) {
                        console.log(e);
                    }
                }).catch(err => {
                console.log(err);
            });
        }}>
            <Form form={form}>
                <Form.Item name="record" label="机器" rules={[{required: true, message: "必选项"}]}>
                    <Select placeholder="选择执行回放实例">
                        {
                            dataSource?.map((item) => {
                                const version = (item.version === "-" ? "" : " 版本:" + item.version);
                                const value = item.ip + "[ 环境: " + item.environment + version + "]";
                                return (
                                    <Select.Option key={item.id} value={JSON.stringify(item)}>{value}</Select.Option>);
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="mock" label="MOCK" initialValue={true} valuePropName="checked">
                    <Switch/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReplayModal;
