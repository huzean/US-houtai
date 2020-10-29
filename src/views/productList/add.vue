<template>
  <div id='addProduct'>
    <div class="addBg" v-if="!choseMaterialDialog&&!choseVirtualDialog">
      <el-link class="el-icon-d-arrow-left" style="font-size:15px" @click="$emit('handleCancel')" :underline="false">返回</el-link>
      <el-form :model="addProductForm" :rules="addPrductRules" ref="addProductForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="所属活动:">
          <span>{{activityName}}</span>
        </el-form-item>
        <el-form-item label="礼品选择:">
          <el-button type="success" size="small" @click="choseMaterial">选实物</el-button>
          <el-button type="primary" size="small" @click="choseVitual">选虚拟</el-button>
          <el-button type="info" size="small" @click="choseOther">其 他</el-button>
        </el-form-item>
        <el-form-item label="礼品图片:" v-if="addProductForm.commodityImage">
          <!-- <el-upload class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false" :on-change="imageChange">
            <img v-if="addProductForm.commodityImage" :src="addProductForm.commodityImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <img :src="addProductForm.commodityImage" alt="" class="img">
        </el-form-item>
        <el-form-item label="礼品名称:" prop="commodityName">
          <el-input v-model="addProductForm.commodityName"></el-input>
        </el-form-item>
        <el-form-item label="库存:" prop="inventoryQuantity">
          <el-input v-model="addProductForm.inventoryQuantity"></el-input>
        </el-form-item>
        <el-form-item label="原价:" prop="originalPrice">
          <el-input v-model="addProductForm.originalPrice"></el-input>
        </el-form-item>
        <el-form-item label="帮砍最低值:" prop="minimumPrice">
          <el-input v-model="addProductForm.minimumPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否显示:" prop="isVisible">
          <el-switch v-model="addProductForm.isVisible" active-color="#13ce66" active-text="是" inactive-text="否"> </el-switch>
        </el-form-item>
        <el-form-item label="是否限购:" prop="isQuota">
          <el-switch v-model="addProductForm.isQuota" active-color="#13ce66" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="限购数量:" prop="quotaNum">
          <el-input v-model="addProductForm.quotaNum" :disabled="!addProductForm.isQuota"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item>
            <el-button type="success" @click="addSubmit('addProductForm')" :disabled="submitLock">提 交</el-button>
            <el-button type="primary" plain @click="cancel">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <!-- 选实物 -->
    <chose-material v-if="choseMaterialDialog" @handleCancel="handleCancel" @handleSelectedGift="handleSelectedMGift"></chose-material>
    <!-- 选虚拟 -->
    <chose-virtual v-if="choseVirtualDialog" @handleCancel="handleCancel" @handleSelectedGift="handleSelectedVGift"></chose-virtual>
  </div>
</template>

<script>
import choseMaterial from "./choseMaterial.vue"
import choseVirtual from "./choseVirtual.vue"
export default {
  props: ["editValue"],
  data() {
    return {
      submitLock: false,

      addProductForm: {
        commodityImage: "",//商品图片
        commodityName: "",//商品名称
        inventoryQuantity: null,//库存
        isVisible: true,//是否显示商品状态，0表示隐藏，1表示显示
        isQuota: true,//是否限购，1表示是，2表示否
        minimumPrice: null,//最低价
        originalPrice: null,//原价
        outId: null,//销售ID
        autoId: null,//自增ID
        quotaNum: 1,//限购数量
        useType: null,//订单类型
        isPayVirtual: null,//是否是支付类的虚拟订单
        commodityType: null,
      },
      addPrductRules: {
        commodityName: [
          { required: true, message: "请输入礼品名称", trigger: 'blur' }
        ],
        inventoryQuantity: [
          { required: true, message: "请输入库存", trigger: 'blur' },
          { pattern: /^[1-9][0-9]*$/, message: "只能是正整数" }
        ],
        originalPrice: [
          { required: true, message: "请填写原价", trigger: 'blur' },
          { pattern: /^(([1-9][0-9]*)|(([0]\.\d{2}|[1-9][0-9]*\.\d{2})))$/, message: "请正确输入价格" }
        ],
        minimumPrice: [
          { required: true, message: "请输入帮砍最低价", trigger: 'blur' },
          { pattern: /^((^([1-9]\d*|[0]{1,1})$)|(([0]\.\d{2}|[1-9][0-9]*\.\d{2})))$/, message: "请正确输入帮砍最低价" }//^([1-9]\d*|[0]{1,1})$
        ],
        isVisible: [
          { required: true, message: "请选择商品状态", trigger: 'change' }
        ],
        isQuota: [
          { required: true, message: "请选择是否限购", trigger: 'change' }
        ],
        quotaNum: [
          { required: false, pattern: /^[1-9][0-9]*$/, message: "只能是正整数" }
        ],
        outId: [
          { required: true, message: "请填销售ID", trigger: 'blur' }
        ],
      },
      activityName: "",
      choseMaterialDialog: false,//选实物
      choseVirtualDialog: false,//选实物
    };
  },
  created: function () {
    this.activityName = this.$route.query.activityName;
    if (this.editValue != '') {
      this.isAddOrEdit();
    }
  },
  mounted: function () {
  },
  methods: {
    isAddOrEdit() {
      Object.assign(this.addProductForm, this.editValue);
      if (this.editValue.isVisible == 1) {
        this.addProductForm.isVisible = true;
      } else {
        this.addProductForm.isVisible = false;
      }
      if (this.editValue.isQuota == 1) {
        this.addProductForm.isQuota = true;
      } else {
        this.addProductForm.isQuota = false;
      }
    },
    //上传图片
    // imageChange(file, fileList) {
    //   const isJPG = file.raw.type === 'image/jpeg';
    //   const isPNG = file.raw.type === 'image/png';
    //   const isLt2M = file.raw.size / 1024 / 1024 < 2;

    //   if (!isJPG && !isPNG) {
    //     return this.$message.error('上传图片只能是 jpg/png 格式!');
    //   }
    //   if (!isLt2M) {
    //     return this.$message.error('上传图片大小不能超过 2MB!');
    //   }
    //   this.addProductForm.commodityImage = URL.createObjectURL(file.raw);
    // },
    //提交
    addSubmit(formName) {
      if (this.submitLock) return;
      this.submitLock = true;

      let _this = this;
      if (this.editValue == '') {
        _this.addProductForm.isVisible = _this.addProductForm.isVisible == true ? 1 : 0;
        _this.addProductForm.isQuota = _this.addProductForm.isQuota == true ? 1 : 2;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.gob.postJson(_this, {
              url: "/bargainCommodity/addBargainCommodity",
              arg: {
                ..._this.addProductForm,
                activityCode: _this.$route.query.activityCode,
                businessCode: _this.$route.query.Code,
                businessId: _this.$route.query.businessId,
                token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
              }
            }).then(res => {
              if (res.code == 10000) {
                _this.$emit("handleCancel");
                _this.$message({ type: "success", message: "添加成功！" });
                _this.$parent.getListData();
              } else {
                _this.message.error(res.msg);
              }
            }).finally(() => {
              this.submitLock = false;
            });
          } else {
            return false;
          }
        });
      } else {
        //编辑
        _this.addProductForm.isVisible = _this.editValue.isVisible == true ? 1 : 0;
        _this.addProductForm.isQuota = _this.editValue.isQuota == true ? 1 : 2;
        _this.gob.postJson(_this, {
          url: "/bargainCommodity/editBargainCommodity",
          arg: {
            ..._this.addProductForm,
            businessCode: _this.$route.query.Code,
            commodityId: _this.editValue.id,
            token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken,
            editor: JSON.parse(localStorage.getItem('userInfo')).userCnName
          }
        }).then(res => {
          if (res.code == 10000) {
            _this.$emit("handleCancel");
            _this.$message({ message: "修改成功", type: "success" });
            _this.$parent.getListData();
          } else {
            _this.$message.error(res.msg);
          }
        }).finally(() => {
          this.submitLock = false;
        });
      }
    },
    //取消
    cancel() {
      this.$emit("handleCancel");
    },
    //选实物
    choseMaterial() {
      this.choseMaterialDialog = true
    },
    //选虚拟
    choseVitual() {
      this.choseVirtualDialog = true
    },
    //选其他
    choseOther() { },
    handleCancel() {
      this.choseMaterialDialog = false;
      this.choseVirtualDialog = false;
    },
    handleSelectedMGift(val) {
      this.addProductForm.commodityImage = val.commodityImage;
      this.addProductForm.commodityName = val.commodityName;
      this.addProductForm.commodityType = val.commodityType;
      this.addProductForm.outId = val.outId;
      this.addProductForm.autoId = val.id;
      this.addProductForm.useType = val.useType;
    },
    handleSelectedVGift(val) {
      let _this = this;
      this.addProductForm.commodityImage = val.commodityImage;
      this.addProductForm.commodityName = val.commodityName;
      this.addProductForm.commodityType = val.commodityType;
      this.addProductForm.outId = val.outId;
      this.addProductForm.autoId = val.id;
      this.addProductForm.useType = val.useType;
      this.gob.post(_this, {
        url: "/ApiRouter.ashx",
        arg: {
          method: "gift_info_v3",
          giftid: val.outId
        }
      }, "https://api.youhuiduo.cn").then(res => {
        if (res.code == 10000) {
          if (res.data.V_Type == 2 || res.data.V_Type == 3) {
            this.addProductForm.isPayVirtual = 2;
          } else {
            this.addProductForm.isPayVirtual = 1;
          }
        } else {
          _this.message.error(res.msg);
        }
      });
    },
  },
  components: { choseMaterial, choseVirtual },
  computed: {}
}

</script>
<style lang='scss' >
@import "./style.scss";
</style>