#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import "RNSplashScreen.h"
#import "MGMG-Swift.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"MGMG";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  // return [super application:application didFinishLaunchingWithOptions:launchOptions]; //This will be assigned as success instead
 
 BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
 
  if (success) {
    //This is where we will put the logic to get access to rootview
    UIView *rootView = self.window.rootViewController.view;
    
    CGFloat red = 242.0 / 255.0;
    CGFloat green = 245.0 / 255.0;
    CGFloat blue = 234.0 / 255.0;
    CGFloat alpha = 1.0;
    
    
    rootView.backgroundColor = [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; // change with your desired backgroundColor
 
    Dynamic *t = [Dynamic new];
    UIView *animationUIView = (UIView *)[t createAnimationViewWithRootView:rootView lottieName:@"loading"]; // change lottieName to your lottie files name
 
    // register LottieSplashScreen to RNSplashScreen
    [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
    // casting UIView type to AnimationView type
    AnimationView *animationView = (AnimationView *) animationUIView;
    // play
    [t playWithAnimationView:animationView];
    // If you want the animation layout to be forced to remove when hide is called, use this code
    [RNSplashScreen setAnimationFinished:true];
  }
 
  return success;
 
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
