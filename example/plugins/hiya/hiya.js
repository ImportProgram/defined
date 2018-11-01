/**
 * Example
 * @author ImportProgram
 */

var event = new EventEmitter();

Manager.onCustomMount((imports) => {
   imports.api.example.aValue() //Call the API

})
Manager.register(null, {
    GLOBAL: {
       
    }
})