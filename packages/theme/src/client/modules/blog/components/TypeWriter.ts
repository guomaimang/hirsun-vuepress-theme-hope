import { defineComponent, h, onMounted, ref } from "vue";

export interface TypeWriterProps {
  /**
   * 要轮流显示的文本数组
   */
  texts: string[];
  /**
   * 打字速度(毫秒)
   */
  typeSpeed?: number;
  /**
   * 删除速度(毫秒)
   */
  deleteSpeed?: number;
  /**
   * 停留时间(毫秒)
   */
  pauseTime?: number;
}

export default defineComponent({
  name: "TypeWriter",

  props: {
    texts: {
      type: Array as () => string[],
      required: true,
    },
    typeSpeed: {
      type: Number,
      default: 150,
    },
    deleteSpeed: {
      type: Number,
      default: 50,
    },
    pauseTime: {
      type: Number,
      default: 2000,
    },
  },

  setup(props) {
    const displayText = ref("");
    const currentTextIndex = ref(0);
    const isDeleting = ref(false);

    const type = (): void => {
      const currentText = props.texts[currentTextIndex.value];
      const currentLength = displayText.value.length;
      
      if (isDeleting.value) {
        // 正在删除
        displayText.value = currentText.substring(0, currentLength - 1);
        
        if (displayText.value === "") {
          isDeleting.value = false;
          // 移至下一个文本
          currentTextIndex.value = (currentTextIndex.value + 1) % props.texts.length;
          // 短暂暂停后开始打字
          setTimeout(type, 500);
        } else {
          setTimeout(type, props.deleteSpeed);
        }
      } else {
        // 正在打字
        displayText.value = currentText.substring(0, currentLength + 1);
        
        if (displayText.value === currentText) {
          // 文本完成，暂停然后开始删除
          isDeleting.value = true;
          setTimeout(type, props.pauseTime);
        } else {
          setTimeout(type, props.typeSpeed);
        }
      }
    };

    onMounted(() => {
      if (props.texts.length > 0) {
        setTimeout(type, 1000);
      }
    });

    return () =>
      h(
        "div",
        { class: "type-writer" },
        [
          h("span", { class: "type-writer-text" }, displayText.value),
          h("span", { class: "type-writer-cursor" })
        ]
      );
  },
}); 