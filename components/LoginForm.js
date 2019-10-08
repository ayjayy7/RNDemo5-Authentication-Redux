import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";

// Actions
import { login, logout, signup, checkForExpiredToken } from "../redux/actions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount = () => {
    this.props.checkForToken();
  };

  handleChange = keyValue => {
    this.setState(keyValue);
  };

  handlelogin = () => {
    this.props.login(this.state);
  };

  handlelogout = () => {
    this.props.logout();
  };
  handleSignup = () => {
    this.props.signup(this.state);
  };

  render() {
    const { username, password } = this.state;
    console.log(this.state);
    if (this.state.user) {
      return (
        <Container>
          <Header />
          <Content>
            <Button onPress={this.handlelogout}>
              <Text>Logout {this.state.user.username}</Text>
            </Button>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header />
          <Content>
            <Form>
              <Item>
                <Input
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChangeText={username =>
                    this.handleChange({ username: username })
                  }
                />
              </Item>
              <Item last>
                <Input
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                  name="password"
                  onChangeText={password =>
                    this.handleChange({ password: password })
                  }
                />
              </Item>
              <Button onPress={this.handlelogin}>
                <Text>Login</Text>
              </Button>
              <Button onPress={this.handleSignup}>
                <Text>Sign Up</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => {
  return {
    login: userData => dispatch(login(userData)),
    logout: () => dispatch(logout()),
    signup: userData => dispatch(signup(userData)),
    checkForToken: navigation => dispatch(checkForExpiredToken(navigation))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
