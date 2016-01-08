let rules =  {
    1:[
        {
            name:'author',
            type:Array,
            label:'作者',
            computed: value => value.join(' / ')
        },
        {
            name:'title',
            type:String,
            label:'书名'
        }
    ],
    2:[
        {
            name:'translator',
            type:Array,
            label:'译者',
            computed: value => value.join(' / ')
        },
        {
            name:'pages',
            type:String,
            label:'页数'
        },
        {
            name:'publisher',
            type:String,
            label:'出版社'
        },
        {
            name:'subtile',
            type:String,
            label:'副标题'
        },
        {
            name:'id',
            type:String,
            label:'豆瓣ID'
        }
    ],
    3:[
        {
            name:'pubdate',
            type:String,
            label:'出版日期'
        },
        {
            name:'price',
            type:String,
            label:'价格'
        }
    ],
    4:[
        {
            name:'binding',
            type:String,
            label:'装帧'
        },
        {
            name:'isbn13',
            type:String,
            label:'ISBN'
        },
        {
            name:'origin_title',
            type:String,
            label:'原作名'
        }
    ]
}


let NoMatched = 'No matched'
let assert = function(rule, value){
    let expectedType
    let valid = true

    switch (rule.type) {
        case String:
            expectedType = 'string'
            valid = typeof value === expectedType && value !== ""
            break
        case Number:
            expectedType = 'number'
            valid = typeof value === expectedType
            break
        case Array:
            expectedType = 'array'
            valid = Array.isArray(value) && value.length > 0
            break
        case Object:
            expectedType = 'object'
            valid = value.toString() === '[object Object]'
            break
        case Boolean:
            expectedType = 'boolean'
            valid = typeof value === expectedType
            break
        default:
            expectedType = NoMatched
            valid = false
    }

    return valid
}

export {rules, assert}
