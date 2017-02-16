<template>
    <div class="container">
        <el-button type="primary" @click="creat_dialog_visible = true">新建地址库</el-button>
        <el-table :data="addresses" style="width: 100%">
            <el-table-column label="联系人">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.contact }}</span>
                </template>
            </el-table-column>
            <el-table-column label="地址">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="公司名称">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.company }}</span>
                </template>
            </el-table-column>
            <el-table-column label="默认">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.default }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog class="creat_dialog" title="新建地址库" v-model="creat_dialog_visible" size="tiny">
            <el-form ref="form" :model="address_form" label-width="100px">
                <el-form-item label="联系人：">
                    <el-col :span="14">
                        <el-input v-model="address_form.contact"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="地区：" :gutter="10">
                    <el-row :gutter="10">
                        <el-col :span="7" style='margin-left: -5px'>
                            <el-select v-model="address_form.province" placeholder="省">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-col>
                        <el-col class="line" :span="1"></el-col>
                        <el-col :span="7">
                            <el-select v-model="address_form.city" placeholder="市">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-col>
                        <el-col class="line" :span="1"> </el-col>
                        <el-col :span="7">
                            <el-select v-model="address_form.district" placeholder="地区">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="详细地址：">
                    <el-col :span="21">
                        <el-input class="address-input" v-model="address_form.address"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="电话：">
                    <el-row :gutter="10">
                        <el-col :span="5" style='margin-left: -5px'>
                            <el-input v-model="address_form.areacode" placeholder="区号"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-input v-model="address_form.phone" placeholder="固话"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-col :span="14">
                        <el-input v-model="address_form.mobilephone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="公司名称：">
                    <el-col :span="14">
                        <el-input v-model="address_form.company"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox-group v-model="address_form.set_default">
                        <el-checkbox label="设为默认发货地址" name="type"></el-checkbox>
                        <el-checkbox label="设为默认退货地址" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
            return {
                input: 80,
                creat_dialog_visible: false,
                addresses: [{
                    contact: "yeoman",
                    address: "chenggaodasha",
                    phone: "15067138372",
                    company: "aicao",
                    default: "发货地址"
                }, {
                    contact: "yeoman",
                    address: "chenggaodasha",
                    phone: "15067138372",
                    company: "aicao",
                    default: "发货地址"
                }],
                address_form: {
                    contact: '',
                    province: '',
                    city: '',
                    district: '',
                    address: '',
                    areacode: '',
                    phone: '',
                    mobilephone: '',
                    company: '',
                    set_default: []
                }
            }
        },
        mounted() {},
        methods: {
            switchChange(enabled) {

            },
        }
}
</script>
<style scoped lang='less'>
.container {
    /*padding: 10px;*/
    width: 100%;
}

.el-table {
    margin-top: 20px;
}
.creat_dialog {
}
.adjustment {
    margin-left: -5px;
}
</style>
