# Keep the WebView bridge callable from JavaScript in release builds.
-keepattributes *Annotation*,SourceFile,LineNumberTable
-keep class com.mcperry.learn.MainActivity { *; }
-keep class com.mcperry.learn.MainActivity$PipBridge { *; }

