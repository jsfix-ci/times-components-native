package com.timescomponents;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {

//TODO on nuk-android https://raw.githubusercontent.com/react-native-community/rn-diff-purge/release/0.69.6/RnDiffApp/android/app/src/main/java/com/rndiffapp/MainActivity.java
//Basically add the below
  @Override
  protected boolean isConcurrentRootEnabled() {
    // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
    // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
    return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
  }
}
