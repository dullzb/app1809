new Vue({
    el: '#app',
    data: {
        todos: [{
                id: 1,
                content: '做作业',
                f: 'true'
            },
            {
                id: 2,
                content: '敲代码',
                f: 'true'
            },
            {
                id: 3,
                content: '打游戏',
                f: 'true'
            }
        ],
        addItem: '',
        activeIndex: -1,
        maskFlag: false,
        type: AbortController,
        tabBars: [{
                id: 1,
                text: 'A',
                style: 'success'
            },
            {
                id: 2,
                text: 'F',
                style: 'primary'
            },
            {
                id: 3,
                text: 'U',
                style: 'danger'
            }
        ]
    },
    methods: {
        add() {
            this.todos.push({
                id: this.todos.length + 1,
                content: this.addItem
            })
        },
        check(index) {
            if (this.todos[index].f) {
                this.remove(index)
            } else {
                this.maskFlag = true
                this.activeIndex = index
            }
        },
        remove(index) {
            this.todos.splice(index, 1)
        },
        confirm(index) {
            this.remove(index)
        }
    },
    computed: {
        finished() {
            return this.todos.filter(function(item) {
                return item.f ? item : false
            })
        },
        unFinished() {
            return this.todos.filter(function(item) {
                return !item.f ? item : false
            })
        },
        newTodos() {
            switch (this.type) {
                case "A":
                    return this.todos
                    break;
                case "F":
                    return this.finished
                    break;
                case "U":
                    return this.unFinished
                    break;

                default:
                    break;
            }
        }
    }
})