<template>
  <div id="ck">
    <ckeditor :editor="editor" @ready="onReady" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'

export default {
  name: 'ck',
  data () {
    return {
      // editor: ClassicEditor,
      editor: DecoupledEditor,
      editorData: '<p>Content of the editor.</p>',
      // createUploadAdapter: abort(),
      editorConfig: {
        Image: {
          resizeUnit: 'px'
        },
        ckfinder: {
          uploadUrl: '/file?command=SaveImage&type=Files&currentFolder=/&fileName=bigbit.png',
          options: {
            resourceType: 'Images'
          }
        }
        // simpleUpload: {
        //   // The URL that the images are uploaded to.
        //   uploadUrl: '#',
        //   // Headers sent along with the XMLHttpRequest to the upload server.
        //   headers: {
        //     'X-CSRF-TOKEN': 'X-Requested-With',
        //     Authorization: 'X-Requested-With'
        //   }
        // }
      }
    }
  },
  methods: {
    onReady (editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement()
      )
    }
  }
}
</script>

<style scoped>
</style>
