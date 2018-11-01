/**
 * Example Defined
 * @author ImportProgram
 * @copyright 2018
 */


let DefinedManager = require("../defined.js")

let manager = new DefinedManager()
//NAMESPACE is used in the API/PLUGIN code. Its like <namespace>.onMount() or <namespace>.register()
manager.setDefinedID("Manager") //Custom NAMESPACE
manager.setPrefix(() => {
    return "$3Manager $f| "
})
//Transforming code is cool tool. Now this example actually names the source code files (because they get a VM to it self)
//So its named to the PLUGIN NAME in uppercase format.
manager.transformCode((code, name) => {
    code = `//# sourceURL=${name.toUpperCase()}\n
    ${code}`

    //console.log(newCode)
    return code

})
//Now we can create the defineds.
//The API one is using the FOLDER API and also allow require (3rd argument). The last argument allows for custom registers. Meaning any API can talk to on another using API: {} only.
manager.addDefined("API", "./api", true, ["API"]) //LOAD ALL API's
//Also we can create a PLUGIN defined. This will only accept plugin code, and NO require is allowed. Good for anything attempt bad code injection. Also pretty much all INTERNAL code (process, global) is blocked
//Plus it returns the NAMESPACE/SERVICES of the DEFINED. This is good because maybe you need to start a API module when all loads.
let plugins = manager.addDefined("PLUGINS", "./plugins", false) //LOAD CUSTOM PLUGINS
//Now after they have loaded, this will WORK!
//Also Defined Custom Console is passsed to have magically things
manager.onAppReady((console) => {
    console.log("Attempt something...")
})