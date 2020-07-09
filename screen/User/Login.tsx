import * as React from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  TextInputProps
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { Button } from '@ant-design/react-native';
import Form, { Field, useForm } from 'rc-field-form';
import { InternalFieldProps } from 'rc-field-form/es/Field';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import { AppContext, AppContextProps } from '../../navigation';
import { hasError } from '../../shared/utils';
import { color } from '../../constants';

interface InputProps {
  name: string;
  icon: string;
  props: TextInputProps;
  options: InternalFieldProps;
}

interface LoginItemProps {
  data: InputProps;
  onChange?: (value: string) => void;
  value?: string;
}

const inputPropsMap: InputProps[] = [
  {
    name: 'username',
    icon: 'yonghu',
    props: {
      placeholder: '请输入用户名'
    },
    options: {
      rules: [
        {
          required: true,
          message: '请输入用户名',
          validateTrigger: 'onChange'
        }
      ],
    }
  },
  {
    name: 'password',
    icon: 'suoding',
    props: {
      placeholder: '请输入密码'
    },
    options: {
      rules: [
        {
          required: true,
          message: '请输入密码',
          validateTrigger: 'onChange'
        }
      ],
    }
  }
]

const LoginItem:React.FC<LoginItemProps> = (props) => {
  const { data, onChange } = props;
  const input = React.useMemo(() => (
    <TextInput
      //style={styles.textInput}
      onChangeText={onChange}
      secureTextEntry={data.name==='password'} 
      underlineColorAndroid='transparent'
      placeholderTextColor='#999'
      returnKeyLabel='确定'
      returnKeyType='done'
      {...data.props}
    />
  ), 
  [data])
  return input
};

export default ():React.ReactElement => {
  const { user } = useDispatch<RematchDispatch<Models>>();
  const { forceNavigationUpdate } = React.useContext<AppContextProps>(AppContext);
  const [ form ] = useForm();
  const { validateFields, getFieldsError, isFieldsTouched } = form;
  const handleLoginSubmit = async () => {
    try {
      const values = await validateFields();
      user.login({
        ...values,
        callback(token:string) {
          forceNavigationUpdate(token)
        }
      });
      //user.login()
    } catch(e) {}
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor: color.fillColor}}>
      <WhenFocusStatusBar barStyle='dark-content' backgroundColor={color.fillColor}/>
      <Form
        form={form}
        component={false}
      >
        {
          inputPropsMap.map(prop => (
            <Field name={prop.name} key={prop.name} {...prop.options}>
              <LoginItem data={prop}/>
            </Field>
          ))
        }
        <Field shouldUpdate>
          {
            () => (
              <Button disabled={ 
                !isFieldsTouched(true) ||
                hasError(getFieldsError())
              } type='primary' onPress={handleLoginSubmit}>登 录</Button>
            )
          }
        </Field>
      </Form>
    </SafeAreaView>
  )
}