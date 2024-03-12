<template>
  <div id="login-page" class="admin">
    <div class="form-holder">
      <div>
        <div class="website-logo-inside">
          <!-- <img src="../assets/logo.png" alt /> -->
        </div>
        <div class="note">欢迎登录管理系统</div>
        <Input
          size="large"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          @on-keyup.13="login"
          >></Input
        >
        <Input
          size="large"
          v-model="loginForm.password"
          type="password"
          password
          placeholder="请输入密码"
          @on-keyup.13="login"
        ></Input>
        <div>
          <Button @click.prevent="login">登录</Button>
          <label>游客无密码登录</label>
        </div>
        <div class="copyright-label">Copyright © 2020</div>
      </div>
    </div>
    <div class="img-holder">
      <div class="info-holder">
        <h3>管理系统</h3>
        <p>创造精彩，引领世界</p>
        <p>TO CREATE COLORFUL LIFE</p>
        <img src="../assets/login_back.svg" alt />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import admin from "@/api/admin";
import system from "@/api/system";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations(["setFactoryId"]),
    login() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$M.warn("用户名和密码均不能为空");
        return;
      }
      admin.userLogin({ ...this.loginForm }).then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("userType", "superAdmin");
        sessionStorage.setItem("authList", JSON.stringify(res.data.action));
        sessionStorage.setItem("factoryId", res.data.user.factoryId);
        sessionStorage.setItem(
          "factoryName",
          res.data.user.factory ? res.data.user.factory.name : ""
        );
        this.getDictionary(res.data.action);
        this.setFactoryId(res.data.user.factoryId);
      });
    },
    getDictionary() {
      system.getDictionaryCategoryAuthIgnore().then((res) => {
        let dictionaryList = {};
        res.data.map((item) => {
          let project = {};
          project.list = item.dictionaries;
          project.valueCode = {};
          project.valueName = {};
          item.dictionaries.map((it) => {
            project.valueCode[it.value] = it;
            project.valueName[it.code] = it;
          });
          dictionaryList[item.code] = project;
        });
        sessionStorage.setItem(
          "dictionaryList",
          JSON.stringify(dictionaryList)
        );
        this.$M.success("登录成功");
        this.$router.push("/admin");
      });
    },
  },
};
</script>
<style lang="less">
#login-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3c81bc;
}
.img-holder {
  width: 550px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #064e89;
  text-align: left;
  h3 {
    padding-left: 30px;
    font-size: 25px;
    font-weight: 900;
    margin-bottom: 30px;
    line-height: 1.2;
  }
  p {
    padding-left: 30px;
    font-size: 19px;
    font-weight: 300;
    line-height: 20px;
    margin-bottom: 10px;
  }
  img {
    width: 400px;
    margin-top: 35px;
  }
  .website-logo-inside {
    margin-bottom: 30px;
    img {
      height: 45px;
    }
  }
}
.form-holder {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 550px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 350px;
  }
  .note {
    color: white;
    margin-bottom: 20px;
    font-size: 15px;
  }
  input {
    margin-bottom: 20px;
  }
  .copyright-label {
    color: #fff;
    margin-top: 150px;
    font-size: 12px;
  }

  label {
    color: white;
    margin-left: 10px;
    &:hover {
      cursor: pointer;
      color: #bbb;
    }
  }
  button {
    color: #3c81bc;
    font-weight: bold;
  }
}
#login-page {
  .img-holder {
    right: 0;
    left: auto !important;
  }
  .form-holder {
    right: 550px;
    left: 0;
  }
}
</style>
