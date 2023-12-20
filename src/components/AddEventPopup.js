// Popup.js
import React from 'react';
import {Button, Form, Input, DatePicker, ColorPicker} from "antd";
import './AddEventPopup.css';

const {RangePicker} = DatePicker
const AddEventPopup = ({ onCancel, onFinish, isNew }) => {
    return (
        <div className="popup-container">
            <div className="popup">
                <div className={'eventPopupLeftRight'}>
                <Form layout={'vertical'} onFinish={onFinish} >
                    <div className={'title'}>
                    <Form.Item name="eventTitle">
                        <Input required placeholder={"Title"}></Input>
                    </Form.Item>

                    <Form.Item name={'colorPicker'}>
                        <ColorPicker initialValue='#1677FF' disabledAlpha presets={[
                            {
                                label: 'Recommended',
                                colors: [
                                    '#F5222D',
                                    '#FA8C16',
                                    '#FADB14',
                                    '#8BBB11',
                                    '#52C41A',
                                    '#13A8A8',
                                    '#1677FF',
                                    '#2F54EB',
                                    '#722ED1',
                                    '#EB2F96',
                                ],
                            }
                        ]}/>
                    </Form.Item>
                    </div>

                    <Form.Item label={"Date"} name="rangepicker">
                        <RangePicker format="DD.MM.YYYY HH:mm" showTime={{ format: 'HH:mm' }} required></RangePicker>
                    </Form.Item>

                    <Form.Item name="isNew" type="hidden" initialValue={isNew} >

                    </Form.Item>

                    <div>
                        <div className={"formButtons"}>
                            <Form.Item>
                                <Button type="primary" htmlType={"submit"}>Save</Button>
                            </Form.Item>
                            <Button onClick={onCancel}>Cancel</Button>
                        </div>
                    </div>

                </Form>
                </div>

            </div>
        </div>
    );
};

export default AddEventPopup;

const transformMonth = (m) => {
    return (parseInt(m) - 1).toString().padStart(2, '0')
}
export const createEvent = (fieldsValue) => {
    let color = '#1677FF';
    if (fieldsValue['colorPicker'] !== undefined) {
        color = fieldsValue['colorPicker'].toHexString();//fieldsValue['colorPicker'];
    }

    const startYear = fieldsValue["rangepicker"][0].format('YYYY');
    const startMonth = transformMonth(fieldsValue["rangepicker"][0].format('MM'));

    const startDay = fieldsValue["rangepicker"][0].format('DD');
    const startHour = fieldsValue["rangepicker"][0].format('HH');
    const startMinute = fieldsValue["rangepicker"][0].format('mm');
    const endYear = fieldsValue["rangepicker"][1].format('YYYY');
    const endMonth = transformMonth(fieldsValue["rangepicker"][1].format('MM'));
    const endDay = fieldsValue["rangepicker"][1].format('DD');
    const endHour = fieldsValue["rangepicker"][1].format('HH');
    const endMinute = fieldsValue["rangepicker"][1].format('mm');
    const newEvent = {
        title: fieldsValue["eventTitle"],
        start: new Date(startYear, startMonth, startDay, startHour, startMinute),
        end: new Date(endYear, endMonth, endDay, endHour, endMinute),
        color: color
    }
    return newEvent;
}


