import React from 'react';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 }
};

let unbindFormValue = {
  role: 'basic'
};

const AccountForm = React.createClass({
  propTypes: {
    formSubmit: React.PropTypes.func.isRequired
  },

  handleSubmit() {
    let values = this.props.form.getFieldsValue();
    values = Object.assign({}, values, unbindFormValue);
    this.props.formSubmit(values);
  },

  handleSelectChange(value) {
    unbindFormValue.role = value;
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          <Input type="text" {...getFieldProps('realName')} placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          <Input type="text" {...getFieldProps('mobileNumber')} placeholder="请输入密码" />
        </FormItem>
        <FormItem
          id="select"
          label="角色"
          {...formItemLayout}
        >
          <Select id="select" size="large" defaultValue={unbindFormValue.role} style={{ width: 200 }} onChange={this.handleSelectChange}>
            <Option value="basic">basic</Option>
            <Option value="advanced">advanced</Option>
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地址"
        >
          <Input type="text" {...getFieldProps('address')} placeholder="请输入地址" />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
});

export default Form.create()(AccountForm);
