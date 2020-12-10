package com.dotel;

import android.os.Bundle; //CM added this

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; //CM Added this

public class MainActivity extends ReactActivity {

  @Override //CM added is
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "doTel";
  }
}
