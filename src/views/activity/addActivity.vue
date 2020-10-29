<template>
  <div id='addActivity'>
    <el-link class="el-icon-d-arrow-left" style="font-size:15px" @click="back" :underline="false">返回</el-link>
    <el-form :model="addActivityValue" :rules="addActivityRules" ref="addActivityForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="活动编码:" prop="activityCode">
        <el-input v-model="addActivityValue.activityCode" style="width:65%" :disabled="canEdit"></el-input>
        <p>不需要填写默认会增加: BC前缀</p>
      </el-form-item>
      <el-form-item label="活动名称:" prop="activityName">
        <el-input v-model="addActivityValue.activityName" style="width:65%"></el-input>
        <span>显示在页面的标题栏</span>
      </el-form-item>
      <el-form-item label="活动起止时间:" prop="activityTime">
        <el-date-picker v-model="addActivityValue.activityTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:65%"></el-date-picker>
        <span class="tip">设置成功后仅允许延长活动结束时间</span>
      </el-form-item>
      <el-form-item label="是否允许发起用户参与砍价:">
        <el-switch v-model="addActivityValue.isVisible" active-color="#13ce66" active-text="是" inactive-text="否" :disabled="canEdit">
        </el-switch>
        <div class="setOtherPrice" style="margin-left:15px">
          <span>砍价区间设置：商品原价-最低价的</span>
          <div v-show="showPriceInput4">
            <el-input style="width:38px" v-model="addActivityValue.openMin" size="medium"></el-input>
            <span>%</span>
            <span>~</span>
            <el-input style="width:38px" v-model="addActivityValue.openMax" size="medium"></el-input>
            <span>%</span>
          </div>
          <div v-show="!showPriceInput4">5%~10%</div>
        </div>
        <!-- <el-button type="text" @click="setPrice('4')" v-show="!showPriceInput4">设置</el-button>
        <el-button type="text" @click="savePrice('4')" v-show="showPriceInput4">取消</el-button> -->
        <span class="tip" style="margin-left:20px">活动期间允许修改砍价区间</span>
      </el-form-item>
      <el-form-item label="选择帮砍用户类型:">
        <el-row>
          <el-row class="rowBg">
            <el-row>
              <el-checkbox label="帮砍用户-新客-首次注册金币联盟（当前商家）" style="width:340px" v-model="addActivityValue.newStauts" :disabled="canEdit"></el-checkbox>
              <div class="setPrice">
                <span>砍价区间：商品原价-最低价的</span>
                <div v-show="showPriceInput1">
                  <el-input style="width:38px" v-model="addActivityValue.newMin" size="medium"></el-input>
                  <span>%</span>
                  <span>~</span>
                  <el-input style="width:38px" v-model="addActivityValue.newMax" size="medium"></el-input>
                  <span>%</span>
                </div>
                <div v-show="!showPriceInput1">5%~10%</div>
              </div>
              <!-- <el-button type="text" @click="setPrice('5')" v-show="!showPriceInput1">设置</el-button>
              <el-button type="text" @click="savePrice('5')" v-show="showPriceInput1">取消</el-button> -->
            </el-row>
            <el-row>
              <el-checkbox label="帮砍用户-老客-参与砍价前注册过金币联盟（当前商家）" style="width:340px" v-model="addActivityValue.oldStauts" :disabled="canEdit"></el-checkbox>
              <div class="setPrice">
                <span>砍价区间：商品原价-最低价的</span>
                <div v-show="showPriceInput2">
                  <el-input style="width:38px" v-model="addActivityValue.oldMin" size="medium"></el-input>
                  <span>%</span>
                  <span>~</span>
                  <el-input style="width:38px" v-model="addActivityValue.oldMax" size="medium"></el-input>
                  <span>%</span>
                </div>
                <div v-show="!showPriceInput2">1%~5%</div>
              </div>
              <!-- <el-button type="text" @click="setPrice('1')" v-show="!showPriceInput2">设置</el-button>
              <el-button type="text" @click="savePrice('1')" v-show="showPriceInput2">取消</el-button> -->
            </el-row>
          </el-row>
          <span class="tip">以上为选填</span>
          <el-row class="rowBg" style="margin-top:10px">
            <div style="display: inline-block;width:185px">其他用户砍价区间设置 <span style="color:red">（必填）</span>：</div>
            <div class="setPrice">
              <span>商品原价-最低价的</span>
              <div v-show="showPriceInput3">
                <el-input style="width:38px" v-model="addActivityValue.otherMin" size="medium"></el-input>
                <span>%</span>
                <span>~</span>
                <el-input style="width:38px" v-model="addActivityValue.otherMax" size="medium"></el-input>
                <span>%</span>
              </div>
              <div v-show="!showPriceInput3">60%~70%</div>
            </div>
            <!-- <el-button type="text" @click="setPrice('20')" v-show="!showPriceInput3">设置</el-button>
            <el-button type="text" @click="savePrice('20')" v-show="showPriceInput3">取消</el-button> -->
            <span class="tip" style="margin-left:15px">活动期间允许修改砍价区间</span>
          </el-row>
        </el-row>
        <span class="tip">用户类型设置后不允许取消，活动期间允许修改砍价区间</span>
      </el-form-item>
      <el-row style="display:flex">
        <el-form-item label="每人限砍次数:" prop="userBargainNum">
          <el-input v-model="addActivityValue.userBargainNum" style="width:100px" placeholder="限砍次数" :disabled="canEdit"></el-input>
        </el-form-item>
        <el-form-item label-width="5px">
          <el-select v-model="addActivityValue.userBargainDateType" style="width:150px" placeholder="请选择" :disabled="canEdit">
            <el-option label="小时" :value="1"></el-option>
            <el-option label="天" :value="2"></el-option>
            <el-option label="周" :value="3"></el-option>
            <el-option label="月" :value="4"></el-option>
          </el-select>
          <span style="margin:0 5px">例如：每人每周限砍8次、每人每天限砍1次等</span>
          <span class="tip">设置后不允许修改</span>
        </el-form-item>
      </el-row>
      <el-row style="display:flex">
        <el-form-item label="砍价商品倒计时:" prop="bargainTimeNum">
          <el-input v-model="addActivityValue.bargainTimeNum" style="width:100px" placeholder="数量" :disabled="canEdit"></el-input>
        </el-form-item>
        <el-form-item label-width="5px">
          <el-select v-model="addActivityValue.bargainDateType" style="width:150px" placeholder="请选择" :disabled="canEdit">
            <el-option label="小时" :value="1"></el-option>
            <el-option label="天" :value="2"></el-option>
            <el-option label="周" :value="3"></el-option>
            <el-option label="月" :value="4"></el-option>
          </el-select>
          <span style="margin:0 5px">例如：12小时、3天、1周</span>
          <span class="tip">设置后不允许修改</span>
        </el-form-item>
      </el-row>
      <el-form-item label="用户中途下单:" prop="payType">
        <el-radio v-model="addActivityValue.payType" :label="2" :disabled="canEdit">必须砍到最低价才能下单</el-radio>
        <el-radio v-model="addActivityValue.payType" :label="1" :disabled="canEdit">允许砍价中途下单</el-radio>
        <span class="tip">设置后不允许修改</span>
      </el-form-item>
      <!-- <el-form-item label="未支付订单有效时长:" prop="payOrderTimeNum">
        <div class="setPrice" style="width:70px">
          <div v-show="showPriceInput6">
            <el-input style="width:38px" v-model="addActivityValue.payOrderTimeNum" size="medium"></el-input>
          </div>
          <div v-show="!showPriceInput6">{{addActivityValue.payOrderTimeNum}}</div>
          <span>分钟</span>
        </div>
        <el-button type="text" @click="setPrice('6')" v-show="!showPriceInput6">设置</el-button>
        <el-button type="text" @click="savePrice('6')" v-show="showPriceInput6">取消</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submit('addActivityForm')">确 定</el-button>
        <el-button type="info" @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["activityId"],
  data() {
    return {
      addActivityValue: {
        activityCode: "",
        activityName: "",
        activityTime: [],
        isVisible: false,
        openMin: "",
        openMax: "",
        newStauts: "",
        newMin: "",
        newMax: "",
        oldStauts: "",
        oldMin: "",
        oldMax: "",
        otherMin: "",
        otherMax: "",
        userBargainNum: "",
        userBargainDateType: 3,
        bargainTimeNum: "",
        bargainDateType: 1,
        payType: 1,
        payOrderTimeNum: "",
      },
      addActivityRules: {
        activityCode: [//活动编码
          { required: true, message: "请填写活动编码", trigger: "blur" }
        ],
        activityName: [//活动名称
          { required: true, message: "请填写活动名称", trigger: "blur" }
        ],
        activityTime: [//活动起止时间
          { required: true, message: "请选择活动起止时间", trigger: "change" }
        ],
        userType: [//用户类型
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        userBargainNum: [//每人限砍次数
          { required: true, message: "请填写每人限砍次数", trigger: "blur" },
          { pattern: /^[1-9][0-9]*$/, message: "只能是正整数" }
        ],
        payType: [//用户中途下单
          { required: true, message: "请选择用户能否中途下单", trigger: "change" }
        ],
        payOrderTimeNum: [//未支付订单有效时长
          { required: true, message: "请填写未支付订单有效时长", trigger: "blur" },
          { pattern: /^[1-9][0-9]*$/, message: "只能是正整数" }
        ],
        bargainTimeNum: [//砍价商品倒计时
          { required: true, message: "请填写砍价商品倒计时", trigger: "blur" },
          { pattern: /^[1-9][0-9]*$/, message: "只能是正整数" }
        ]
      },
      showPriceInput1: true,
      showPriceInput2: true,
      showPriceInput3: true,
      showPriceInput4: true,
      showPriceInput6: true,
      canEdit: true,
    };
  },
  created: function () {
    this.isEditOrAdd();
  },
  mounted: function () {
  },
  methods: {
    back() {
      this.$emit('handleCancle');
    },
    //判断是编辑还是添加
    isEditOrAdd() {
      if (this.activityId == '') {
        this.canEdit = false;
      } else {
        this.canEdit = true;
        this.addActivityValue = Object.assign(this.addActivityValue, this.activityId)
        this.addActivityValue.activityTime.push(this.addActivityValue.starTime);
        this.addActivityValue.activityTime.push(this.addActivityValue.endTime);
        this.addActivityValue.strategys.map((item) => {
          if (item.strategyType == 1) {
            this.addActivityValue.newStauts = true;
            this.addActivityValue.newMin = item.bargainMinPrice;
            this.addActivityValue.newMax = item.bargainMaxPrice;
          }
          if (item.strategyType == 2) {
            this.addActivityValue.oldStauts = true;
            this.addActivityValue.oldMin = item.bargainMinPrice;
            this.addActivityValue.oldMax = item.bargainMaxPrice;
          }
          if (item.strategyType == 3) {
            this.addActivityValue.isVisible = true;
            this.addActivityValue.openMin = item.bargainMinPrice;
            this.addActivityValue.openMax = item.bargainMaxPrice;
          }
          if (item.strategyType == 4) {
            this.addActivityValue.otherMin = item.bargainMinPrice;
            this.addActivityValue.otherMax = item.bargainMaxPrice;
          }
        });
      }
    },
    //取消
    cancel() {
      this.$emit('handleCancle');
    },
    //提交
    submit(formName) {
      let _this = this;
      let value = _this.addActivityValue;
      let strategys = [];
      let regDot = /^\d+(\.\d+)?$/;
      // let regZ = /^[1-9][0-9]*$/;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.activityId == "") {
            if (new Date(Date.parse(_this.addActivityValue.activityTime[0])) < new Date()) {
              return _this.$message.error("活动开始时间需大于当前时间");
            }
          }
          if (value.isVisible) {
            if (regDot.test(value.openMax) && regDot.test(value.openMin) && Number(value.openMax) > Number(value.openMin)) {
              strategys.push({ max: value.openMax, min: value.openMin, status: 1, strategyType: 3 });
            } else {
              return _this.$message.error("请正确填写 “发起用户” 砍价区间");
            }
          }
          if (value.newStauts) {
            if (regDot.test(value.newMax) && regDot.test(value.newMin) && Number(value.newMax) > Number(value.newMin)) {
              strategys.push({ max: value.newMax, min: value.newMin, status: 1, strategyType: 1 });
            } else {
              return _this.$message.error("请正确填写 “帮砍用户-新客” 砍价区间");
            }
          }
          if (value.oldStauts) {
            if (regDot.test(value.oldMax) && regDot.test(value.oldMin) && Number(value.oldMax) > Number(value.oldMin)) {
              strategys.push({ max: value.oldMax, min: value.oldMin, status: 1, strategyType: 2 });
            } else {
              return _this.$message.error("请正确填写 “帮砍用户-老客” 砍价区间");
            }
          }
          if (regDot.test(value.otherMax) && regDot.test(value.otherMin) && Number(value.otherMax) > Number(value.otherMin)) {
            strategys.push({ max: value.otherMax, min: value.otherMin, status: 1, strategyType: 4 });
          } else {
            return _this.$message.error("请正确填写 “其他用户” 砍价区间");
          }
          //添加
          if (_this.activityId == '') {
            const options = {
              url: "/management/bargainActivityInfo/addActivity",
              arg: {
                ..._this.addActivityValue,
                endTime: _this.addActivityValue.activityTime[1],
                starTime: _this.addActivityValue.activityTime[0],
                strategys: strategys,
                businessCode: _this.$route.query.Code,
                businessId: _this.$route.query.businessId,
                token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
              }
            };
            options.arg.activityCode = 'BC' + options.arg.activityCode; 

            _this.gob.postJson(_this, options).then(res => {
              if (res.code == 10000) {
                _this.$message({ type: "success", message: res.msg });
                _this.$parent.getListData();
                _this.cancel();
              } else {
                _this.message.error(res.msg);
              }
            });
          } else {
            //编辑
            if (_this.comptime(_this.addActivityValue.starTime, _this.addActivityValue.activityTime[0]) != 2) {
              return _this.$message.error("不能修改活动开始时间");
            }
            if (_this.comptime(_this.addActivityValue.endTime, _this.addActivityValue.activityTime[1]) == 1) {
              return _this.$message.error("只能延迟活动结束时间");
            }
            _this.gob.postJson(_this, {
              url: "/management/bargainActivityInfo/editActivity",
              arg: {
                endTime: _this.addActivityValue.activityTime[1],
                payOrderTimeNum: _this.addActivityValue.payOrderTimeNum,
                strategys: strategys,
                businessCode: _this.$route.query.Code,
                token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
              }
            }).then(res => {
              if (res.code == 10000) {
                _this.$message({ type: "success", message: "修改成功" });
                _this.$parent.getListData();
                _this.cancel();
              } else {
                _this.message.error(res.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    comptime(firstDate, lastDate) {
      var beginTime = firstDate;
      var endTime = lastDate;
      var beginTimes = beginTime.substring(0, 10).split('-');
      var endTimes = endTime.substring(0, 10).split('-');

      beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
      endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

      var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
      if (a < 0) {
        return 1;//结束时间小于开始时间
      } else if (a == 0) {
        return 2;//相等
      } else if (a > 0) {
        return 3;//大于
      }
    }
  },
  components: {},
  computed: {}
}

</script>
<style lang='scss' scoped>
#addActivity {
  width: 1180px;
  // padding: 50px 0 0 50px;
  .demo-ruleForm {
    padding: 20px 0 0 50px;
  }
  .setPrice {
    display: inline-block;
    width: 400px;
    div {
      display: inline-block;
    }
  }
  .tip {
    color: red;
  }
  .rowBg {
    border-radius: 10px;
    padding: 5px 10px;
    background-color: rgba(242, 242, 242, 1);
  }
  .setOtherPrice {
    display: inline-block;
    width: 430px;
    div {
      display: inline-block;
    }
  }
}
</style>