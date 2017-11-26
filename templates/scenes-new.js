import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
  /* new subScene import */
} from '../subScenes';
import {
} from '../components';
import {
  /* new action import */
} from '../actions';

class {upperName}Scene extends Component {
  render() {
    return (
      <View>
        <Text>{upperName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

const mapStateToProps = ({ {name} }) => {
  const { error, loading } = {name};
  return { error, loading };
};

export default connect(mapStateToProps, {
  /* new action export */
})({upperName}Scene);
