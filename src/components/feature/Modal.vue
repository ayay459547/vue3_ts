<template>
  <el-dialog v-model="_visible" :title="title">
    <template v-if="!!_useSlots['default']" #default>
      <slot></slot>
    </template>
    <template v-if="!!_useSlots['footer']" #footer>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button type="info">返回</el-button>
          <el-button type="primary">確認</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { 
  defineProps, 
  defineEmits, 
  computed,
  useSlots
} from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:visible'])

let _visible = computed({
  get () { return props.visible },
  set (v) { emit('update:visible', v) }
})

const _useSlots = useSlots()

</script>

<style lang="scss" scoped>
  
</style>