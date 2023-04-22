import { Component } from "react";
import { IconButton } from "react-native-paper";

type ArrowButtonProps = {
  onPress?: () => void;
};

export class ArrowLeftButton extends Component<ArrowButtonProps> {
  render() {
    return (
      <IconButton
        icon="chevron-left"
        iconColor="#fff"
        onPress={this.props.onPress}
        size={40}
        style={{
          marginLeft: -20,
        }}
      />
    );
  }
}

export class ArrowRightButton extends Component<ArrowButtonProps> {
  render() {
    return (
      <IconButton
        icon="chevron-right"
        iconColor="#fff"
        onPress={this.props.onPress}
        size={40}
        style={{
          marginRight: -20,
        }}
      />
    );
  }
}
