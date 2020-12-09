// @flow

import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import emitter from '@/emitter';
import { ORANGE } from '@/utils/constants';
import { DEVICE_LARGE, DEVICE_OS } from '@/utils/deviceConstants';
import { recoverData } from './helpers';

type State = {
  pass: string,
  completed: number,
  total: number,
  restoreInProgress: boolean,
};

const Container = DEVICE_OS === 'ios' ? KeyboardAvoidingView : View;

class RestoreScreen extends React.Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    pass: '',
    completed: 0,
    total: 0,
    restoreInProgress: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      emitter.on('restoreProgress', this.updateRestoreStatus);
      emitter.on('restoreTotal', this.updateRestoreTotal);
    });

    navigation.addListener('blur', () => {
      emitter.off('restoreProgress', this.updateRestoreStatus);
      emitter.off('restoreTotal', this.updateRestoreTotal);
    });
  }

  updateRestoreStatus = (num: number) => {
    this.setState(({ completed }) => ({
      completed: completed + num,
    }));
  };

  updateRestoreTotal = (num: number) => {
    this.setState({
      total: num,
    });
  };

  restoreCompleted = async () => {
    const { t } = this.props;
    Alert.alert(
      t('common.alert.info'), 
      t('restore.alert.text.restoreSuccess'), 
      [{ text: t('common.alert.ok') }]
    );
  };

  resetState = () => {
    this.setState({
      restoreInProgress: false,
      completed: 0,
      total: 0,
      pass: '',
    });
  };

  skip = () => {
    console.log('skip called');
    this.setState({ pass: '' });
    this.restore();
  };

  restore = () => {
    const { navigation, t } = this.props;
    this.setState({ restoreInProgress: true });
    recoverData(this.state.pass)
      .then((result) => {
        result ? this.restoreCompleted() : this.resetState();
      })
      .catch((err) => {
        this.resetState();
        err instanceof Error ? console.warn(err.message) : console.log(err);
        if (err instanceof Error && err.message === 'bad password') {
          Alert.alert(
            'Uh Oh',
            'Incorrect password!',
            [{ text: t('common.alert.ok'), onPress: () => navigation.goBack() }],
          );
        }
        if (err instanceof Error && err.message === 'bad sigs') {
          Alert.alert(
            t('restore.alert.title.notTrusted'),
            t('restore.alert.text.notTrusted'),
            [{ text: t('common.alert.ok'), onPress: () => navigation.goBack() }],
          );
        }
      });
  };


  renderButtonOrSpinner = () => {
    const { t } = this.props;
    if (!this.state.restoreInProgress)
      return (
        <TouchableOpacity
          style={styles.startRestoreButton}
          onPress={this.restore}
        >
          <Text style={styles.buttonInnerText}>{t('restore.button.startRestore')}</Text>
        </TouchableOpacity>
      );
    else if (this.state.pass)
      return (
        <View style={styles.loader}>
          <Text style={styles.textInfo}>
            {t('restore.text.downloadingData')}
          </Text>
          {this.state.total !== 0 && (
            <Text style={styles.textInfo}>
              {t('common.text.progress', {completed: this.state.completed, total: this.state.total})}
            </Text>
          )}
          <Spinner isVisible={true} size={97} type="Wave" color="#4990e2" />
        </View>
      );
    else
      return (
        <Spinner isVisible={true} size={97} type="Wave" color="#4990e2" />
      );
  };

  render() {
    const { pass } = this.state;
    const { t } = this.props;
    return (
      <>
        <View style={styles.orangeTop} />
        <Container style={styles.container} behavior="padding">
          <View style={styles.textInputContainer}>
            <Text style={styles.textInfo}>
              {t('restore.text.enterPassword')}
            </Text>
            <TextInput
              // eslint-disable-next-line no-shadow
              onChangeText={(pass) => this.setState({ pass })}
              value={pass}
              placeholder={t('common.placeholder.password')}
              placeholderTextColor="#9e9e9e"
              style={styles.textInput}
              autoCorrect={false}
              textContentType="password"
              autoCompleteType="password"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            {this.renderButtonOrSpinner()}
          </View>
          {!this.state.restoreInProgress && (
            <View style={styles.skipContainer}>
              <Text>
                You can
                <Text style={styles.skipLink} onPress={this.skip}> skip </Text>
                loading connections and groups names and photos,
                but you will not able to see those connections and groups anymore!
              </Text>
            </View>
          )}
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  orangeTop: {
    backgroundColor: ORANGE,
    height: DEVICE_LARGE ? 70 : 65,
    width: '100%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
    marginTop: -58,
    zIndex: 10,
    overflow: 'hidden',
  },
  textInputContainer: {
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 44,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInfo: {
    fontFamily: 'ApexNew-Book',
    fontSize: 18,
    color: '#333',
    margin: 18,
  },
  textInput: {
    fontFamily: 'ApexNew-Light',
    fontSize: 30,
    color: '#333',
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9e9e9e',
    marginTop: 22,
    width: 275,
    textAlign: 'left',
    paddingBottom: 5,
  },
  buttonInfoText: {
    fontFamily: 'ApexNew-Book',
    color: '#9e9e9e',
    fontSize: 14,
    width: 298,
    textAlign: 'center',
  },
  startRestoreButton: {
    backgroundColor: '#428BE5',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
    marginTop: 22,
  },
  buttonInnerText: {
    fontFamily: 'ApexNew-Medium',
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  button: {
    width: 300,
    borderWidth: 1,
    borderColor: '#4990e2',
    paddingTop: 13,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  skipContainer: {
    paddingTop: 30,
    fontSize: 14,
    margin: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  skipLink: {
    color: 'blue',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default connect()(withTranslation()(RestoreScreen));
