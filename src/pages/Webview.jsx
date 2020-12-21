import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HotelWebview() {
  const webview = React.useRef(null);

  function handleWebViewNavigationStateChange(newNavState) {
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      webview.current.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      webview.current.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      webview.current.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      webview.current.injectJavaScript(redirectTo);
    }
  }

  return (
    <WebView
      ref={(ref) => (webview.current = ref)}
      source={{ uri: 'https://reactnative.dev/' }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator color="black" size="large" />}
    />
  );
}

//<WebView originWhitelist={['*']} source={{ html: '<h1>This is a static HTML source!</h1>' }} />
