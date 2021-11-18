import React, {useEffect, useState} from "react";
import styles from "./Replay.module.less";
import {Button, Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import service, {ReplayParams, ReplayVO} from "./service";
import {useHistory} from "react-router-dom";

const Replay: React.FC = () => {
    const history = useHistory();
    const [queryParams, setQueryParams] = useState<ReplayParams>({page: 1, size: 10});
    const [dataSource, setDataSource] = useState<ReplayVO[]>([]);

    const columns: ColumnsType<ReplayVO> = [
        {
            title: "repeatId",
            dataIndex: "repeatId",
            key: "repeatId",
        }, {
            title: "应用名",
            dataIndex: "appName",
            key: "appName",
        }, {
            title: "环境",
            dataIndex: "environment",
            key: "environment",
        }, {
            title: "IP",
            dataIndex: "ip",
            key: "ip",
        }, {
            title: "创建时间",
            dataIndex: "gmtCreate",
            key: "gmtCreate",
        }, {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                let label = "未知";
                switch (record.status) {
                    case "PROCESSING":
                        label = "执行中";
                        break;
                    case "FAILED":
                        label = "已失败";
                        break;
                    case "FINISH":
                        label = "已完成";
                        break;
                }
                return (
                    <Button type="primary" ghost shape="round" size="small"
                            danger={record.status === "FAILED"}>{label}</Button>);
            },
        }, {
            title: "操作",
            key: "action",
            width: 70,
            render: (_, record) => {
                return (<div className={styles.ActionPanel}>
                    <Button type={"primary"} size="small" ghost={record.status === "PROCESSING"}
                            onClick={() => {
                                history.push("/replayResult?appName=" + record.appName + "&repeatId=" + record.repeatId);
                            }}>详情</Button>
                </div>);
            },
        },
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const resp = await service.replay(queryParams);
                if (resp.success) {
                    setDataSource(resp.data || []);
                }
            } catch (e) {
                setDataSource([]);
            }
        };
        void fetch();
    }, [queryParams]);

    return (<div className={styles.Panel}>
        <Table size="small" rowKey={(record) => record.repeatId} columns={columns} dataSource={dataSource}/>
    </div>);
};

export default Replay;
