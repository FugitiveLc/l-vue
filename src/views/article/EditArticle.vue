<template>
   <el-form ref="form" :rules="rules"  :model="form" label-width="80px">
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input v-model="form.articleTitle" maxlength="100" ></el-input>
      </el-form-item> 
      <el-form-item label="文章作者">
        <el-input v-model="form.articleAuthor" placeholder="不填则表示是原创" maxlength='100' ></el-input>
      </el-form-item> 
      <el-form-item label="文章分类" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择文章分类">
          <el-option v-for="(item,index) in classifyList"
           :key="index" :label="item.categoryName" :value="item.categoryId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签">
         <el-tag
          :key="tag"
          v-for="tag in form.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item> 
      <el-form-item label="文章描述">
        <el-input type="textarea" v-model="form.articleDesc" maxlength="200"></el-input>
      </el-form-item>
       <el-form-item label="文章内容" class="article-conetent" >
          <mavon-editor style="height: 100%;min-height:500px;" 
            :ishljs = "true" ref="md" @imgAdd="$imgAdd"
             v-model="form.articleMarkdown"
             @change="changeData" ></mavon-editor>
      </el-form-item>
      <el-form-item    >
        <el-button type="primary" @click="onSubmit(1)">直接发布</el-button>
        <el-button type="warning" @click="onSubmit(0)">放入草稿箱</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {getAllClassify} from '@api/classify'
import {addArticle,updateArticle} from '@api/article'
import {imageUpLoad} from '@api/resources'

export default {
  name:'EditArticle',
  components:{
    mavonEditor
  },
  data() {
      return {
        form: {
          articleId:null,
          articleAuthor: '',
          articleMarkdown:'',
          articleContent: '',
          articleDesc: '',
          articleTitle: '',
          publicStatus:0,
          categoryId: null,
          tags:[]          
        },
        rules:{
          articleTitle:[
             { required: true, message: '请输入文章标题！', trigger: 'blur' },
             { min: 1, max: 100, message: '标题长度应在1-100个字符间', trigger: 'blur' }
          ],
          categoryId:[
            { required: true, message: '请选择文章分类！', trigger: 'change' }
          ]
        },
        inputVisible: false,
        inputValue: '',
        classifyList:[],
        img_file: {}
      }
    },
    mounted(){
      this.getClassifyList();  //拉取用户所有分类信息
      if(this.$route.params.article){
         this.updateInit(this.$route.params.article)
      }
    },
    methods: {
      updateInit(article){
          Object.assign(this.form,article);
          this.form.tags=article.tags ? article.tags.split(','):[]; 
      },
       getClassifyList(){
          getAllClassify().then(res=>{
           this.classifyList=res.data;
          })
       },
       changeData(value, render) {
          this.form.articleContent = render;
        },
        $imgAdd(pos, $file){
            //添加图片
            var formdata = new FormData();
            formdata.append('file', $file);
            imageUpLoad(formdata).then(res=>{
              this.$refs.md.$img2Url(pos, res.data);
            })
        },
      onSubmit(publicStatus) {
         if(!this.validate()) return;  //验证不通过
         let article={};
         Object.assign(article,this.form)
         article.tags=article.tags.join(","); //存储标签
         article.publicStatus=publicStatus; //草稿或者发布 0 1
         this.addOrUpdateArticle(article);
      },
      validate(){
        let isOk=false;
        this.$refs.form.validate((valid) => {
          if (valid) {
             isOk=true;
          } else {
            this.$notify.error({
              title: '操作失败',
              message: '请仔细检查你的文章信息！'
            });
            return false;
          }
        });
        return isOk;
      },
      addOrUpdateArticle(data){         
        const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background:'rgba(0,0,0,0)'
          });
          if(data.articleId){  //修改
            updateArticle(data).then(res=>{
              this.$notify({
                title: '操作成功！',
                message: '文章已修改！',
                type: 'success'
              });
            }).catch(()=>{
                loading.close();   
            }); 
          }else{ //新增
            addArticle(data).then(res=>{
              this.$notify({
                title: '操作成功！',
                message: '文章已上传！',
                type: 'success'
              });
              this.form.articleId=res.data.articleId; //拿到文章id
            }).catch(()=>{
                loading.close();   
            }); 
          }
          loading.close();   
      },
       handleClose(tag) {
        this.form.tags.splice(this.form.tags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.form.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      } 
    }
}
</script>
<style lang="scss"  >
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
 .article-conetent{
     .el-form-item__label{
       display: block;
       float:none;
     }
     .el-form-item__content{
       margin-left:0 !important;
     }
 }
</style>