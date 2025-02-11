import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'

export default class home extends Component {
  render() {
    return (
      <View style={{
        padding:20, marginTop:20
      }}>
        <Header/>
        <Slider/>
      </View>
    )
  }
}

const styles = StyleSheet.create({})