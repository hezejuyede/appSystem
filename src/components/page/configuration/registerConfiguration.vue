<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>APP基础配置</el-breadcrumb-item>
                <el-breadcrumb-item>注册页面配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <span>智能检索按钮</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="智能检索按钮" class="handle-input mr10"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>工位</span>
                        <span>:</span>
                        <el-select
                                v-model="workStation"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                @change="changeSelect"
                                placeholder="请选择工位">
                            <el-option
                                    v-for="item in workStationOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增按钮</el-button>
                    <el-button type="danger" icon="delete" class="handle-del mr10" @click="showDelete">删除按钮</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              height="450"
                              @select-all="selectAll"
                              @select="selectList"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <el-table-column
                                type="selection"
                                width="30">
                        </el-table-column>
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <!--新增弹出框 -->
            <el-dialog title="新增按钮" :visible.sync="addVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="工位名称">
                        <el-select
                                v-model="workStation"
                                clearable
                                filterable
                                disabled
                                allow-create
                                default-first-option
                                placeholder="请选择工位">
                            <el-option
                                    v-for="item in workStationOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="按钮名称">
                        <el-input v-model="name" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="事件类型">
                        <el-select
                                v-model="type"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入或者选择">
                            <el-option
                                    v-for="item in typeOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可点">
                        <el-select
                                v-model="disabled"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入或者选择">
                            <el-option
                                    v-for="item in disabledOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="按钮颜色">
                        <el-color-picker v-model="backgroundColor"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="显示隐藏">
                        <el-select
                                v-model="showHide"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入或者选择">
                            <el-option
                                    v-for="item in showHideOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 编辑弹出框 -->
            <el-dialog title="编辑按钮" :visible.sync="editVisible" width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="工位名称">
                        <el-select
                                v-model="workStation"
                                clearable
                                disabled
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择工位">
                            <el-option
                                    v-for="item in workStationOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="按钮名称">
                        <el-input v-model="name" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="事件类型">
                        <el-select
                                v-model="type"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入或者选择">
                            <el-option
                                    v-for="item in typeOptions"
                                    :key="item.indexno"
                                    :label="item.name"
                                    :value="item.indexno">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可点">
                        <el-select
                                v-model="disabled"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入或者选择">
                            <el-option
                                    v-for="item in disabledOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="按钮颜色">
                        <el-color-picker v-model="backgroundColor"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="显示隐藏">
                        <el-select
                                v-model="showHide"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入或者选择">
                            <el-option
                                    v-for="item in showHideOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="删除按钮" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../../assets/js/URL'
    import Modal from '../../common/modal'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData:[],
                id:"",


                cols: [],
                tableData: [],

                select_word: '',

                addVisible: false,
                editVisible: false,
                delVisible: false,


                workStation:"",
                workStationOptions:[],
                name: "",
                type: "",
                typeOptions: [],
                disabled: "",
                disabledOptions: [{"name": "可点击", "id": "1"}, {"name": "不可点击", "id": "0"}],
                backgroundColor: "",
                showHide: "",
                showHideOptions: [{"name": "显示", "id": "1"}, {"name": "隐藏", "id": "0"}],

            }
        },
        computed: {
            //模糊检索
            tables: function () {
                var search = this.select_word;
                if (search) {
                    return this.tableData.filter(function (dataNews) {
                        return Object.keys(dataNews).some(function (key) {
                            return String(dataNews[key]).indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }
        },
        components: {Modal},
        mounted() {


        },
        created() {
            this.getAdminState();
        },
        methods: {

            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {
                    this.$router.push("/")
                }
                else {
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
                        axios.post(" " + url + "/sys/dictionaryList", {"id": "23"}),
                    ])
                        .then(axios.spread(function (select,type) {
                            that.workStation = select.data[0].id;
                            that.workStationOptions = select.data;
                            that.typeOptions = type.data;
                            that.loadingShowData(1);
                        }));
                }
            },

            //瞬间加载数据
            loadingShowData(data) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "jgxqan"}),
                    axios.post(" " + url + "/padShow/buttonList", {"id": data})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },

            //根据工位选择
            changeSelect() {
                this.loadingShowData(this.workStation)
            },

            //选择那个一个
            selectList(val) {
                if (val.length) {
                    let data = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    this.listData = data;
                }
                else {
                    this.listData=[];
                }
            },

            //列表全部选择
            selectAll(val) {
                if (val.length) {
                    let data = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    this.listData = data;
                }
                else {
                    this.listData = [];
                }
            },

            //显示新增
            showAdd(){

                if (this.workStation) {
                    this.addVisible=true;
                    this.name= "";
                    this.type= "";
                    this.disabled= "";
                    this.backgroundColor="";
                    this.showHide= "";
                }
                else {
                    this.message = "请选择工位";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            //进行新增
            doAdd() {
                if (this.name && this.type && this.disabled &&this.backgroundColor&&this.showHide) {
                    axios.post(" " + url + "/padShow/buttonAdd",
                        {
                            "gongxuid": this.workStation,
                            "name": this.name,
                            "type": this.type,
                            "disabled": this.disabled,
                            "backgroundcolor": this.backgroundColor,
                            "show": this.showHide,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(`新增成功`);
                                this.addVisible = false;
                                this.loadingShowData(this.workStation)

                            }
                            else {
                                this.$message.warning(`新增失败`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入不能为空`);
                }
            },

            //双击点击行内编辑
            edit(row, column, cell, event) {
                this.editVisible = true;
                this.id = row.id;
                axios.post(" " + url + "/padShow/buttonDetail", {"id": this.id})
                    .then((res) => {
                        this.workStation = res.data.data.gongxuid;
                        this.name = res.data.data.name;
                        this.type = Number(res.data.data.type);
                        this.disabled = res.data.data.disabled;
                        this.backgroundColor = res.data.data.backgroundcolor;
                        this.showHide = res.data.data.show;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },

            // 保存编辑
            saveEdit() {
                if (this.name && this.type && this.disabled &&this.backgroundColor&&this.showHide) {
                    axios.post(" " + url + "/padShow/buttonUpdate",
                        {
                            "id":this.id,
                            "gongweiid": this.workStation,
                            "name": this.name,
                            "type": this.type,
                            "disabled": this.disabled,
                            "backgroundcolor": this.backgroundColor,
                            "show": this.showHide,
                        }
                    )
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.editVisible = false;
                                this.$message.success(`修改成功`);
                                this.loadingShowData(this.workStation)
                            }
                            else {
                                this.$message.warning(`新增失败`);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入不能为空`);
                }

            },

            //选择点击显示删除
            showDelete() {
                if (this.listData.length) {
                    this.delVisible = true;
                }
                else {
                    this.message = "请勾选要删除的按钮";
                    this.HideModal = false;
                    const that = this;

                    function a() {
                        that.message = "";
                        that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                }
            },

            // 确定删除
            deleteRow() {
                axios.post(" " + url + "/padShow/buttonDel",
                    {
                        "id": this.listData[0],
                    }
                )
                    .then((res) => {
                        if (res.data.state === "1") {
                            this.$message.success('删除成功');
                            this.delVisible = false;
                            this.loadingShowData(this.workStation);
                        }
                        else {
                            this.$message.warning(`删除失败`);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/less/base";

    .template {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .template-content {
            .handle-box {
                height: 80px;
                line-height:80px;
                padding-left: 50px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width:100px;
                    height: 30px;
                }
            }
            .del-dialog-cnt {
                font-size: 16px;
                text-align: center
            }
            .table {
                width: 100%;
                font-size: 14px;
            }
            .red {
                color: #ff0000;
            }

        }
    }


</style>

