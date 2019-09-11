<template>
  <div id="ck">
    <form id="myForm" @submit.prevent="sendPost">
      <ckeditor :editor="codeEditor" @ready="onReady" @input="typing" :config="codeEditorConfig" ></ckeditor>
      <button>Send</button>
    <!-- <textarea name="textarea" id="textarea" cols="30" rows="10" v-text="wijoEditorData" ></textarea> -->
    </form>
  </div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ko'

export default {
  name: 'ck',
  data () {
    return {
      codeEditor: DecoupledEditor,
      wijoEditorData: '',
      codeEditorConfig: {
        language: 'ko',
        Image: {
          resizeUnit: 'px'
        },
        ckfinder: {
          uploadUrl: '/file?command=SaveImage&type=Files&currentFolder=/&fileName=bigbit.png',
          options: {
            resourceType: 'Images'
          }
        }
      }
    }
  },
  methods: {
    sendPost () {
      this.$http.post('http://localhost:3000/uploadBoard', {
        userId: 1,
        title: '자유게시판',
        data: this.wijoEditorData
      }).then(function(res) {
      	console.log(res.data)
      }, function() {
      	console.log('failed')
      })
    },
    typing (event) {
      this.wijoEditorData = event
    },
    onReady (editor) {
      console.log('옴111')
      editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement()
      )
    }
  }
}
</script>

<style scoped>
#ck {
  height: 300px;
  border: solid 1px;
}
.ck {
  height: 85%;
}
</style>
