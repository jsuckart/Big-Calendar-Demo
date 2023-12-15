// Popup.js
import React from 'react';
import {Button, Form, Input, DatePicker, ColorPicker} from "antd";
import './AddEventPopup.css';

const {RangePicker} = DatePicker
const AddEventPopup = ({ onCancel, onFinish }) => {
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