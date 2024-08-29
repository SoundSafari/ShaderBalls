# ShaderBalls

![](readme-assets/ShaderBalls.webp)

**🎛️ - Your PRs are always welcome! Accepting anything that extends vanilla shadertoy.com functionality.**

## What it does

This extension just includes:

* A firefox/chromium extension to easily preview your shadertoy.com shaders on 3D objects.
* Free, public-domain/CC0-1.0, opensource.
* New button to trigger 3D preview

![](readme-assets/ShaderBalls.png)

## How does it function

* This add-on injects JavaScript into https://shadertoy.com pages so it can add new UX and features.
* Powered by popular open-source libs [THREE.js](https://github.com/mrdoob/three.js) and [Camera-Controls](https://github.com/yomotsu/camera-controls).
* Under the hood it uses the the THREE.CanvasTexture to easily map the live-rendered shader onto 3D objects.

## Dev Instructions FireFox

```bash
git clone git@github.com:SoundSafari/ShaderBalls.git
cd Shaderballs
npm install
```

To run the shaderballs extension:

*  Install the
   [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)
   tool. At the command line, open the example extension's folder and type
   `web-ext run`. This launches Firefox and installs the extension automatically.
   This tool provides some additional development features, such as
   [automatic reloading](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Automatic_extension_reloading).  

Or..

*  Open Firefox and load the `about:debugging` page. Click
   [Load Temporary Add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
   and select the `manifest.json` file within the ShaderBalls folder.
   Here is a [video](https://www.youtube.com/watch?v=cer9EUKegG4)
   that demonstrates how to do this.

## Dev Instructions Chromium

```bash
git clone git@github.com:SoundSafari/ShaderBalls.git
cd Shaderballs
npm install
```

1. In your browser navigate to `chrome://extensions`.
2. Enable developer-mode (top-right).
3. Load unpacked extension button > select the ShaderBalls folder.

For chrome, each time you make a code update, you'll need to manually refresh the extension from the `chrome://extensions` page and refresh any active tab(s) that were running ShaderBalls.
