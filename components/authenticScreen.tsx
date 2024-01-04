import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useState, useEffect} from 'react';
const NocountTxt = styled.Text`
  margin-top: 20px;
  color: black;
`;
const BtnEntrar = styled.TouchableOpacity`
  background-color: #f1ebeb;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;
const Input = styled.TextInput`
  width: 230px;
  height: 40px;
  background-color: #f1ebeb;
  border-radius: 10px;
  padding-left: 13px;
  margin-top: 50px;
`;
const HeaderTxt = styled.Text`
  font-size: 20px;
  color: #607d8b;
`;
type loginScrenProps = {
  headerTxt: string;
  btnTxt: string;
  valueEmail: string;
  valuePass: string;
  onChangeEmail: (content: string) => void;
  onChangePass: (content: string) => void;
  pressBtn: () => void;
  btnAccountTxt: string;
  btnAccountPress: () => void;
};

const AuthenticScreen = (props: loginScrenProps) => {
  return (
    <>
      <HeaderTxt>{props.headerTxt}</HeaderTxt>
      <Input
        placeholder="digite o seu email"
        value={props.valueEmail}
        onChangeText={props.onChangeEmail}></Input>
      <Input
        secureTextEntry={true}
        placeholder="digite a sua senha"
        value={props.valuePass}
        onChangeText={props.onChangePass}></Input>
      <BtnEntrar onPress={props.pressBtn}>
        <Text>{props.btnTxt}</Text>
      </BtnEntrar>
      <TouchableOpacity onPress={props.btnAccountPress}>
        <NocountTxt>{props.btnAccountTxt}</NocountTxt>
      </TouchableOpacity>
    </>
  );
};

export {AuthenticScreen};
