/*
 * @Descripttion: commonVueTemplate
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-10-28 09:46:08
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-07 16:47:55
 */
import Vue from 'vue'
import {
    Dialog,
    Input,
    Select,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimePicker,
    Tooltip,
    Row,
    Col,
    Image,
    Loading,
    Form,
    FormItem,
    Message,
    Notification,
    Menu,
    CheckboxGroup,
    Checkbox,
    Icon,
    RadioGroup,
    RadioButton,
    Radio,
    Popover,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    MenuItem,
    Option,
    Tabs,
    TabPane,
    Pagination,
    Switch,
    Progress,
    Collapse,
    CollapseItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Tooltip)
// Vue.use(Message)
Vue.use(Row)
Vue.use(Col)
Vue.use(Image)
Vue.use(Menu)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Icon)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(MenuItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Option)
Vue.use(RadioButton)
Vue.use(Progress)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Loading)

// 注册Vue全局
Vue.prototype.$loading = Loading.service
// Vue.prototype.$message = Message
// Vue.prototype.$alert = MessageBox.alert  
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification