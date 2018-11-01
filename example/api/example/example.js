/**
 * Example
 * @author ImportProgram
 */

var event = new EventEmitter();
let ready = false
Manager.onCustomMount((imports) => {
   
    let value = 19
    event.on("getValue", () => {
        callback(value)
    })
    event.emit("ready")
    ready = true
})
Manager.register(null, {
    GLOBAL: {
        doSomething: (name) => {
            console.log("FROM EXAMPLE")
        },
        aValue: (name, callback) => {
            let main = () => {
                event.emit("getValue", callback)
            }
            if (ready) {
                main()
            } else {
                event.on("ready", () => {
                    main()
                })
            }
        }
    }
})