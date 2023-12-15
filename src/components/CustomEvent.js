import {Button, Flex} from "antd";
import {LeftOutlined, RightOutlined, UploadOutlined} from "@ant-design/icons";
import React from "react";
import {RightCircleFilled} from "@ant-design/icons";
import Icon from "antd/es/icon";
import './CustomEvent.css'

const CustomEvent = ({event}, color) => {

    return (
            <div className={"eventTitle"} style={{color: event.color, background: 'rgba(51,170,52, .4)'}} > <RightCircleFilled style={{color: event.color, fontSize: '1.2vh', marginRight:'5px'}}/>{event.title}</div>
    )
}

export default CustomEvent