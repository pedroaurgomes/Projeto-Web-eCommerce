<template>
  <button
    class="button"
    :class="classList"
    :style="style"
    ref="button"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    // Allowed values are "filled" and "outlined"
    type: {
      type: String,
      required: false,
      default: "filled",
    },
    color: {
      type: String,
      required: false,
      default: "blue"
    },
    hoverColor: {
      type: String,
      required: false,
      default: "dark-blue"
    },
    // Allowed values are "sm", "small", "md", "medium", "lg", "large", "xl", "extra-large"
    size: {
      type: String,
      require: false,
      default: "md",
    }
  },
  computed: {
    style() {
      if (this.type === "filled") {
        let styleObj = {
          backgroundColor: `var(--${this.color})`
        };
        // If a light color is beeing used as a background, make the foreground color black.
        if (/^light/.exec(this.color)) styleObj.color = `var(--black)`;
        return styleObj;
      } else {
        return {
          borderColor: `var(--${this.color})`,
          color: "var(--black)",
        }
      }
    },
    // Returns the name of the class for the specific size
    normalizedSize() {
      switch (this.size) {
        case "sm":
        case "small": return "btn-sm";
        case "md":
        case "medium": return "btn-md";
        case "lg":
        case "large": return "btn-lg";
        case "xl":
        case "extra-large": return "btn-xl";
        default: return "btn-md";
      }
    },
    classList() {
      const list = [];
      if (this.type === "outlined") list.push("outlined");
      list.push(this.normalizedSize);
      return list.join(" ");
    }
  }
}
</script>
<style>
.button {
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  border-radius: 50px;
  cursor: pointer;
  transition: box-shadow var(--transition-speed) ease;
  transition: background-color var(--transition-speed) ease;
  box-sizing: border-box;
  height: fit-content;
  width: fit-content;
}

.button:hover {
  box-shadow: var(--dark-gray) 2px 2px 4px 0px;
}

.button.outlined {
  border: 2px solid;
  background-color: transparent;
}

.button.btn-sm {
  padding: 0.3em 1.25em;
}

.button.btn-md {
  padding: 0.625em 1.25em;
}

.button.btn-lg {
  padding: 0.625em 1.25em;
  font-size: 1.4em;
}

/* TODO: define "btn-xl" */
</style>
