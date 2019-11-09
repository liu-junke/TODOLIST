var bus = new Vue()

Vue.component('Tab', {
    template: '#tab',
    props: ['kick'],
    methods: {
        // change_input_flag() {
        //     bus.$emit('input_flag_change')
        // }
        hit() {
            this.kick()
        }
    }
})

Vue.component('Container', {
    template: '#container',
    props: ['todos'],
    data() {
        return {
            input_flag: false
        }
    },
    methods: {
        changeContainerFlag(index) {
            this.$emit('change_flag', index)
        },
        checkDone(index) {
            this.$emit('check', index)
        },
        add(e) {
            this.$emit('add_item', e.target.value)
            this.input_flag = false
        },
        inputchange() {
            this.input_flag = !this.input_flag
        }
    },

    // mounted() {
    //     var that = this
    //     bus.$on('input_flag_change', function() {
    //         that.input_flag = !that.input_flag
    //     })
    // }
})

Vue.component('myMask', {
    template: '#mask',
    props: ['close_mask', 'remove_index', 'remove'],
    methods: {
        confirm() {
            this.close_mask()
            this.remove(this.remove_index)
        }
    }
})

Vue.component('TabBar', {
    template: '#tabbar',
    props: ['type'],
    data() {
        return {
            tabbars: [{
                    id: 1,
                    text: 'A',
                    class: 'circle-success'
                },
                {
                    id: 2,
                    text: 'F',
                    class: 'circle-primary'
                },
                {
                    id: 3,
                    text: 'U',
                    class: 'circle-danger'
                }
            ]
        }
    },
    methods: {
        changeSelectType(val) {
            this.$emit('get_type', val)
        }
    }
})








new Vue({
    el: '#app',
    data: {
        mask_flag: false,
        remove_index: 0,
        type: 'A',
        todos: [{
                id: 1,
                task: '任务一',
                done: true
            },
            {
                id: 2,
                task: '任务二',
                done: true
            },
            {
                id: 3,
                task: '任务三',
                done: true
            }
        ]
    },
    methods: {
        changeFlag(index) {
            this.todos[index].done = !this.todos[index].done
        },
        check(index) {
            const flag = this.todos[index].done
            if (flag) {
                this.remove(index)
            } else {
                this.remove_index = index
                this.changeMaskFlag()
            }
        },
        remove(index) {
            this.todos.splice(index, 1)
        },
        changeMaskFlag() {
            this.mask_flag = true
        },
        closeMask() {
            this.mask_flag = false
        },
        addItem(val) {
            this.todos.push({
                id: sort(this.todos)[0].id + 1,
                task: val,
                done: false
            })
        },
        changeType(val) {
            this.type = val
        },
        getSon() {
            console.log(this)
            this.$refs.container.inputchange()
        }
    },
    computed: {
        filtertodos() {
            switch (this.type) {
                case 'A':
                    return this.todos
                    break;
                case 'F':
                    return this.todos.filter(item => item.done)
                    break;
                case 'U':
                    return this.todos.filter(item => !item.done)
            }
        }
    }
})

function sort(arr) {
    return arr.sort(function(a, b) {
        return b.id - a.id
    })
}