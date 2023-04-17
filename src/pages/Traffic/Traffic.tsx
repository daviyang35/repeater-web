import React, {useEffect, useState} from "react";
import styles from "./Traffic.module.less";
import {Button, message, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import repeaterApi, {TrafficItem} from "@/services/Repeater";
import {useHistory} from "react-router-dom";
import {TablePaginationConfig} from "antd/lib/table/interface";
import ReplayModal from "@/pages/Traffic/ReplayModal";
import TrafficService from "@/pages/Traffic/TrafficService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Traffic = () => {
    const [dataSource, setDataSource] = useState<TrafficItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProps, setModalProps] = useState({appName: "", traceId: ""});
    const getTrafficList = async () => {
        try {
            let repeaterResp = await repeaterApi.getOnline(currentPage);
            if (!repeaterResp.success) {
                message.error(repeaterResp.message || "网络错误，请稍后再试。");
                return;
            }
            setDataSource(repeaterResp.data);
            setTotal(repeaterResp.count);
        } catch (e) {
            message.error("发生了错误");
        }
    }

    useEffect(() => {
        void getTrafficList();
        },[currentPage]);

    let history = useHistory();

    const detailClicked = (traceId: string, appName: string) => {
        history.push("/trafficDetails?id=" + traceId + "&appName=" + appName);
    };
    const deleteClicked = async (id: number, appName: string) => {
        const resp = await TrafficService.delRecord(id);
        if(resp.success) {
            message.info("删除成功：" + id);
            void await getTrafficList();
            return;
        } else {
            message.warn(resp.message);
        }
    };

    const columns: ColumnsType<TrafficItem> = [{
        title: "应用名",
        dataIndex: "appName",
        key: "appName",
    }, {
        title: "流量入口",
        dataIndex: "entranceDesc",
        key: "entranceDesc",
    }, {
        title: "TraceID",
        dataIndex: "traceId",
        key: "traceId",
    }, {
        title: "主机",
        dataIndex: "host",
        key: "host",
        width: 150,
    }, {
        title: "时间",
        dataIndex: "gmtRecord",
        key: "gmtRecord",
    }, {
        title: "环境",
        dataIndex: "environment",
        key: "environment",
    }, {
        title: "操作",
        key: "action",
        width: 200,
        render: (_, record) => {
            return (<div className={styles.ActionPanel}>
                <Button type={"primary"} size="small" onClick={() => {
                    detailClicked(record.traceId, record.appName);
                }}>详情</Button>
                <Button type={"primary"} size="small" onClick={() => {
                    setModalProps({appName: record.appName, traceId: record.traceId});
                    setModalVisible(true);
                }}>回放</Button>
                <Button type={"primary"} size="small" danger onClick={() => {
                    deleteClicked(record.id, record.appName);
                }}>删除</Button>
            </div>);
        },
    }];

    const pagination: TablePaginationConfig = {
        total: total,
        current: currentPage,
        hideOnSinglePage: true,
        showTotal: (total) => `共 ${total} 条`,
        showQuickJumper: true,
        onChange: (page) => {
            setCurrentPage(page);
        },
    };

    return (
        <div className={styles.TrafficPanel}>
            <ReplayModal onReplay={() => {
            }} onCancel={() => {
                setModalVisible(false);
            }} appName={modalProps.appName} traceId={modalProps.traceId} visible={modalVisible}/>
            <Table columns={columns} dataSource={dataSource} pagination={pagination} rowKey={record => record.id}/>
        </div>
    );
};
export default Traffic;
