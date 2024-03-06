import React, { FC, useEffect } from "react";
import { OptionType, QuestionRadioPropsType } from "./interface";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    });
  }, [title, isVertical, options, value]);

  function handleValueChange() {
    if (onChange == null) return;
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;

    if (newValues.options) {
      newValues.options = newValues.options.filter(
        (opt) => !(opt.text == null),
      );
    }

    const { options = [] } = newValues;
    options.forEach((opt) => {
      if (opt.value) return;
      opt.value = nanoid(5); // 填充 opt.value
    });

    onChange(newValues);
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();

                            let num = 0;
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++; // 记录 text 相同的个数， 预期只有一个
                            });

                            if (num === 1) return Promise.resolve();
                            return Promise.reject(
                              new Error("和其他选项重复了"),
                            );
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>

                    {/* 当前选项 删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options
            .map(({ text, value }) => ({
              value,
              label: text || "",
            }))
            .concat({ value: "", label: "无" })}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
