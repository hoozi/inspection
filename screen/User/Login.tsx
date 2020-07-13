import * as React from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  TextInputProps,
  Image,
  ImageBackground
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { Button } from '@ant-design/react-native';
import Form, { Field, useForm } from 'rc-field-form';
import { InternalFieldProps } from 'rc-field-form/es/Field';
import WhenFocusStatusBar from '../../components/WhenFocusStatusBar';
import CaiNiao from '../../icon/CaiNiao';
import { AppContext, AppContextProps } from '../../navigation';
import { hasError } from '../../shared/utils';
import { color } from '../../constants';
import styles from './style';

interface InputProps {
  name: string;
  icon: string;
  props: TextInputProps;
  options: InternalFieldProps;
}

interface LoginItemProps {
  data: InputProps;
  onFocusStateChange:(name:string, type:string) => void;
  onChange?: (value: string) => void;
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
  const { data, onChange, onFocusStateChange } = props;
  const [ visible, setVisible ] = React.useState<boolean>(false);
  const textInputRef = React.useRef<any>();
  const handleToggleVisible = React.useCallback(() => {
    data.name==='password' && textInputRef.current.blur();
    setVisible(!visible);
  },[visible,textInputRef]);
  const input = React.useMemo(() => (
    <>
      <TextInput
        ref={textInputRef}
        style={styles.textInput}
        onChangeText={onChange}
        secureTextEntry={data.name==='password' && !visible} 
        underlineColorAndroid='transparent'
        placeholderTextColor='#c8c8c8'
        returnKeyLabel='确定'
        returnKeyType='done'
        onFocus={() => onFocusStateChange(data.name, 'focus')}
        onBlur={() => onFocusStateChange(data.name, 'blur')}
        {...data.props}
      />
      {
        data.name==='password' && 
        <CaiNiao name={visible ? 'xianshikejian' : 'yincangbukejian'} color='#999' size={22} onPress={handleToggleVisible}/>
      }
    </>
  ), 
  [data,visible])
  return input
};

type Focuses = {
  [key: string]: boolean;
}

const focuses:Focuses = {
  'username': false, 
  'password': false
}

export default ():React.ReactElement => {
  const { user } = useDispatch<RematchDispatch<Models>>();
  const [isFocuses, setFocuses] = React.useState<Focuses>(focuses)
  const { forceNavigationUpdate } = React.useContext<AppContextProps>(AppContext);
  const [ form ] = useForm();
  const { validateFields, getFieldsError, isFieldsTouched } = form;
  const handleLoginSubmit = React.useCallback(async () => {
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
  }, [user]);
  const handleFocusChange = React.useCallback((name, type) => {
    const newIsFocuses = {...isFocuses}
    newIsFocuses[name] = type === 'focus';
    setFocuses(newIsFocuses);
  }, [isFocuses, setFocuses]);
  return (
    <SafeAreaView style={styles.container}>
      <WhenFocusStatusBar barStyle='dark-content' backgroundColor='#fbfcfd' hidden/>
      <ImageBackground source={require('../../static/lg.png')} resizeMethod='resize' style={{flex:1}}>
        <View style={styles.loginForm}>
          <View style={styles.appIconContainer}>
            <Image source={require('../../static/appIcon.png')} resizeMethod='resize' style={styles.appIcon}/>
          </View>
          <Text style={styles.loginTitle}>账号登录</Text>
          <Form
            form={form}
            component={false}
          >
            {
              inputPropsMap.map(prop => (
                <View key={prop.name} style={{
                  ...styles.loginItem, 
                  ...(isFocuses[prop.name] ? 
                    {
                      borderBottomColor: color.textBaseColor 
                    } : {}) 
                  }}>
                  <CaiNiao name={prop.icon} size={20} color={isFocuses[prop.name] ? color.textBaseColor : '#c8c8c8'}/>
                  <Field name={prop.name} key={prop.name} {...prop.options}>
                    <LoginItem data={prop} onFocusStateChange={handleFocusChange}/>
                  </Field>
                </View>
              ))
            }
            <Field shouldUpdate>
              {
                () => (
                  <Button disabled={ 
                      !isFieldsTouched(true) ||
                      hasError(getFieldsError())
                    } 
                    type='primary' 
                    onPress={handleLoginSubmit}
                    style={styles.loginButton}
                  >登 录</Button>
                )
              }
            </Field>
          </Form>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}