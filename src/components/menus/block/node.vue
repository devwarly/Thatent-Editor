<template>
  <t-dropdown
    placement="bottom-right"
    overlay-class-name="umo-block-menu-dropdown"
    :max-height="320"
    trigger="click"
    :destroy-on-close="false"
    :popup-props="popupProps"
  >
    <menus-button
      class="umo-block-menu-button"
      :menu-active="menuActive"
      ico="block-add"
      hide-text
    />
    <t-dropdown-menu>
      <t-dropdown-item class="umo-block-menu-group-name" disabled>
        {{ t('blockMenu.insert') }}
      </t-dropdown-item>
      <t-dropdown-item>
        <menus-button
          ico="table"
          :text="t('table.insert.text')"
          :tooltip="false"
          @menu-click="editor?.chain().focus().insertTable().run()"
        />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('image')">
        <menus-button
          ico="image"
          :text="t('insert.image.text')"
          :tooltip="false"
          @menu-click="insertImage"
        />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('hr')">
        <menus-button
          ico="hr"
          :text="t('insert.hr.text')"
          :tooltip="false"
          @menu-click="
            editor?.chain().focus().setHorizontalRule({ type: 'signle' }).run()
          "
        />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('toc')">
        <menus-toolbar-insert-toc :huge="false" :tooltip="false" />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('text-box')">
        <menus-toolbar-insert-text-box :huge="false" :tooltip="false" />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('web-page')">
        <menus-toolbar-insert-web-page :huge="false" :tooltip="false" />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('math')">
        <menus-toolbar-tools-math :huge="false" :tooltip="false" />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('echarts')">
        <menus-toolbar-tools-echarts
          :huge="false"
          :tooltip="false"
          mode="add"
        />
      </t-dropdown-item>
      <t-dropdown-item v-if="!disableMenu('mermaid')">
        <menus-toolbar-tools-mermaid :huge="false" :tooltip="false" />
      </t-dropdown-item>
      
    </t-dropdown-menu>
  </t-dropdown>
</template>

<script setup>
const props = defineProps({
  node: {
    type: Object,
    default: null,
  },
  pos: {
    type: Number,
    default: null,
  },
})
const emits = defineEmits(['dropdown-visible'])

const container = inject('container')
const options = inject('options')
const editor = inject('editor')
const uploadFileMap = inject('uploadFileMap')
const blockMenu = inject('blockMenu')

let menuActive = $ref(false)
const popupProps = {
  attach: `${container} .umo-main-container`,
  popperOptions: {
    modifiers: [{ name: 'offset', options: { offset: [2, 0] } }],
  },
  onVisibleChange(visible) {
    blockMenu.value = visible
    menuActive = visible
    editor.value
      ?.chain()
      .selectTextblockEnd()
      .selectNodeForward()
      .focus(props.pos)
      .run()
    emits('dropdown-visible', visible)
  },
}

const disableMenu = (name) => {
  return options.value.disableExtensions.includes(name)
}

const insertImage = () => {
  editor.value
    ?.chain()
    .focus()
    .selectFiles('image', container, uploadFileMap.value)
    .run()
}

const setTemplate = ({ content }) => {
  if (!content || !editor.value) {
    return
  }
  editor.value.commands.insertContent(content)
}
</script>

<style lang="less"></style>
