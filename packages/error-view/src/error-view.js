import { Component } from "react";
import PropTypes from "prop-types";
import NewRelic from "newrelic-react-native-agent";

class ErrorView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.handleError = this.handleError.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    const isFatal = false;
    NewRelic.NRMAModularAgentWrapper.execute(
      "recordStack",
      "ErrorView" + error.name,
      error.message + '\n' + error.cause,
      errorInfo.componentStack + "\n\n\n" + error.stack,
      isFatal,
      NewRelic.JSAppVersion,
    );
    this.setState({
      error: e,
    });
  }

  handleError(e) {
    this.setState({
      error: e,
    });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return children({
      error,
      hasError: !!error,
      onError: this.handleError,
    });
  }
}

ErrorView.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ErrorView;
