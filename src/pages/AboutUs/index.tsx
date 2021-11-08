import {FC} from "react";

import styles from "./index.module.less";

// 关于我们
const AboutUs: FC = () => {
    return (
        <div className={styles.aboutBox}>
            <div className={styles.title}>
                <p>关于</p>
                daviyang35&lt;at&gt;gmail.com
            </div>
        </div>
    );
};

export default AboutUs;
