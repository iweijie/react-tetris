
const observer = {
    store: {},
    on: function (type, callback) {

        if (!this.store[type]) {
            this.store[type] = callback;
        }
    },
    emit: function (type, playload, context) {
        if (!this.store[type]) return alert("没有注册当前事件");
        if (context) {
            return this.store[type].call(context, playload)
        } else {
            return this.store[type](playload)
        }
    },
    remove: function (type) {
        if(!type){
            this.store = {}
            return
        }
        delete this.store[type]
    },
    once: function (type, callback) {
        var _this = this;
        if (!this.store[type]) {
            this.store[type] = function () {
                return function ( playload, context) {
                    if (context) {
                        callback.call(context, playload)
                    } else {
                        callback(playload)
                    }
                    _this.remove(type)
                }
            }();
        }
    }
}

// window.observer = observer

export default observer