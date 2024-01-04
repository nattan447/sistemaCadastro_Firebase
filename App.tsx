/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {FirebaseConfig} from './FirebaseConfig';
import {initializeApp} from 'firebase/app';
import {SafeAreaView, StatusBar, StyleSheet, Alert} from 'react-native';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthenticScreen} from './components/authenticScreen';
function App(): React.JSX.Element {
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassWord] = useState<string>('');

  const clear = {
    clearEmail: () => setEmail(''),
    clearPass: () => setPassWord(''),
  };

  function inputLength(input: string): number {
    const regexEmptyInput = /^\S+$/;
    if (input != undefined) {
      const nameNoSpaces = input
        .split('')
        .filter(char => regexEmptyInput.test(char));
      return nameNoSpaces.length;
    } else {
      return 0;
    }
  }
  useEffect(() => {
    const app = initializeApp(FirebaseConfig);
    console.log('Firebase initialized');
  }, []);
  const signIn = async () => {
    if (inputLength(email) >= 1 && inputLength(password) >= 1)
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        Alert.alert(
          'relatório',
          'login bem sucedido usuario  ' + userCredential.user.email,
          [
            {
              text: 'fechar',
            },
          ],
        );
        clear.clearEmail();
        clear.clearPass();
        console.log('entrou na conta com sucesso:', userCredential.user);
      } catch (error) {
        Alert.alert('relatório', 'erro, email ou senha incorretos', [
          {
            text: 'fechar',
          },
        ]);
        console.error('Sign-in error:', error);
      }
    else Alert.alert('relatório', 'preencha os dois campos');
  };
  const signUp = async () => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputLength(email) >= 1 && inputLength(password) >= 1) {
      if (regexEmail.test(email)) {
        console.log('passou no teste do email');
        if (password.length >= 6) {
          try {
            const userCredential = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );

            Alert.alert(
              'relatório',
              'usario criado com sucesso: ' + userCredential.user.email,
              [
                {
                  text: 'fechar',
                },
              ],
            );
            clear.clearEmail();
            clear.clearPass();
            console.log('usuário criado com sucesso:', userCredential.user);
          } catch (error) {
            console.error('erro ao criar o usuário:', error);
            Alert.alert('relatório', 'falha ao criar conta', [
              {
                text: 'fechar',
              },
            ]);
          }
        } else
          Alert.alert(
            'relatório',
            'a senha deve possuir pelo menos 6 caracteres',
          );
      } else {
        console.log('email não está no modelo correto');
        Alert.alert('relatório', 'digite o email com o modelo correto');
      }
    } else Alert.alert('relatório', 'preencha os dois campos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true}></StatusBar>

      {hasAccount ? (
        <AuthenticScreen
          headerTxt="entrar em sua conta"
          valueEmail={email}
          onChangeEmail={Em => {
            setEmail(Em);
          }}
          valuePass={password}
          onChangePass={ps => setPassWord(ps)}
          btnTxt="entrar"
          pressBtn={signIn}
          btnAccountTxt="não possui conta"
          btnAccountPress={() => setHasAccount(false)}
        />
      ) : (
        <AuthenticScreen
          headerTxt="cadastre uma conta"
          valueEmail={email}
          onChangeEmail={Em => {
            setEmail(Em);
          }}
          valuePass={password}
          onChangePass={ps => setPassWord(ps)}
          btnTxt="cadastrar"
          pressBtn={signUp}
          btnAccountTxt="já tenho conta"
          btnAccountPress={() => {
            setEmail('');
            setPassWord('');
            setHasAccount(true);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
