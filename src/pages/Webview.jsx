import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const html = `
<html>
<head></head>
<body>
  <script>
    setTimeout(function () {
      window.ReactNativeWebView.postMessage("Hello!")
    }, 2000)
  </script>
  <div><b>This is the hotel main page.</b></div>
</body>
</html>
`;

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

  WebView.isFileUploadSupported().then((res) => {
    if (res === true) {
      console.log('file upload is supported in this OS');
    } else {
      console.log('file upload is not supported in this OS');
    }
  });

  const runFirst = `
  window.isNativeApp = true;
  true; // note: this is required, or you'll sometimes get silent failures
`;

  const runSecond = `
  document.body.style.backgroundColor = 'red';
  setTimeout(function() { window.alert('You just injected some JS to your webview!') }, 2000);
  true; // note: this is required, or you'll sometimes get silent failures
`;

  const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

  React.useEffect(() => {
    setTimeout(() => {
      webview.current.injectJavaScript(run);
    }, 3000);
  }, [run]);

  return (
    <WebView
      ref={(ref) => (webview.current = ref)}
      source={{ html }}
      onMessage={(event) => {
        alert(event.nativeEvent.data);
      }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator color="black" size="large" style={{ flex: 1 }} />}
      onFileDownload={({ nativeEvent }) => {
        const { downloadUrl } = nativeEvent;
        // --> Your download code goes here <--
      }}
      injectedJavaScript={runSecond}
      injectedJavaScriptBeforeContentLoaded={runFirst}
      sharedCookiesEnabled={true}
    />
  );
}

//<WebView originWhitelist={['*']} source={{ html: '<h1>This is a static HTML source!</h1>' }} />
