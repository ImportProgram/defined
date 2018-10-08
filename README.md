# defined

A plugin/API/code management system thats under 5k (min).


## Why use defined?
Defined was created because how third party plugins can be executed. I didn't want "unsafe" code to be used, so with defined you can load folders of code and set there properties. One folder can be a API folder, which can be called on by the main program created. This API can have REQUIRE enabled, which is an amazing feature to enable and disable because not all plugins need REQUIRE. Also having the code based on custom register allows for plugins to emit to the API but not to each other. Lastly defined is only using AMD-loader for asyncronous loading of code. 

## Using it
### Step 1
Defined can be used by downloading the file, then loaded by
```js
let DefinedManager = require("./defined")
let manager = new DefinedManager()
```
### Step 2
Set the defined ID, this is the custom namespace use for the plugins/api's

Also you set a prefix to all console messages (if want to)

They support a Minecraft Style Color Code system using **$**
(0 = black, 4 = red, 2 = green, E = yellow, 1 = blue, D = magenta, 3 = cyan, f = white)
```js
manager.setDefinedID("CustomNamespace")
//Set custom prefix to //console log outputs
manager.setPrefix("$4Example")
```
### Step 3
Creating an API/Plugin loader is easy as said below. The parameters goes as follows:
- Name: "Api":
- Folder path to load modules
- Allow require? (usually FALSE  for plugins)
- Allow custom global register? (as array)
```js
let api = manager.addDefined("API", path.join(__dirname, "./api"), true, ["CLIENT"])
let plugin = manager.addDefined("PLUGINS", path.join(__dirname, "./plugins"), false, [])
```

### Step 3.1 
Also if you need JSX compiling for API's and plugins you can use the following code for transpiling code. Keep in mind the require.resolve for babel plugins is recommended. The code below may differ based on babel presets and plugins installed as well.
```js
var { transform } = require("babel-core");
manager.transformCode((code) => {
    let newCode = transform(code, {
        "presets": [require.resolve("babel-preset-es2015"), require.resolve("babel-preset-react")],
        "plugins": [
            require.resolve("babel-plugin-transform-async-to-generator"),
            require.resolve("babel-plugin-transform-object-rest-spread")
        ],
    }).code
    return newCode
})
```

### Step 4
Create an API
In the API folder, you need to create another folder called example, and in that folder a new file called package.json, it should look like: 
```
> api
  > example
    - package.json
```
In that newly created package file, you need to have this JSON structure:
- Name: Name of the MODULE
- Version: Version of the MODULE
- Main: The main JS FILE to run. This is located in the same directory as the package file created. Can be called whatever you want.
- Author: Author of MODULE
- Custom: The custom imports of other modules
  - Example would be "api:main" if a plugin used this module. The "api:" is defined in Step 3 as it was named as API for that defined. (lower case for consuming only)
```json
{
    "name": "main",
    "version": "1.0.0",
    "main": "main.js",
    "author": "ImportProgram",
    "consumes": []
}

```
### Step 5
