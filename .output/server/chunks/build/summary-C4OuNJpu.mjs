import { m as makeComponentProps, t as makeTagProps, u as useRender, i as makeDimensionProps, k as useDimension, a as makeRoundedProps, g as makeTransitionProps, I as Intersect, f as useBackgroundColor, e as useRounded, v as makeBorderProps, h as makeDensityProps, w as makeSizeProps, x as makeVariantProps, y as useBorder, z as useVariant, j as useDensity, A as useSize, b as makeElevationProps, l as makeLoaderProps, B as makeLocationProps, C as makePositionProps, D as makeRouterProps, R as Ripple, c as useElevation, n as useLoader, E as useLocation, F as usePosition, G as useLink, q as useFormStore, V as VApp, o as VContainer, r as VBtn, s as VIcon, p as VDefaultsProvider, H as genOverlays, L as LoaderSlot, _ as __nuxt_component_0, M as MaybeTransition } from './VContainer-CMUemt5-.mjs';
import { capitalize, computed, h, toRef, shallowRef, ref, watch, nextTick, defineComponent, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext, camelize, withDirectives, mergeProps, Fragment, resolveDirective, vShow } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a2 as breakpoints, p as propsFactory, g as genericComponent, H as provideDefaults, v as getCurrentInstance, I as IconValue, z as makeThemeProps, A as provideTheme, u as useRouter, m as convertToUnit } from './server.mjs';
import 'vue-router';
import 'pinia';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-the-mask';

function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name: name != null ? name : capitalize(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _a;
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style
        }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
}
const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: (str) => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
const VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className) classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: [classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
const VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: ["v-row", classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const VCardActions = genericComponent()({
  name: "VCardActions",
  props: makeComponentProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        slim: true,
        variant: "text"
      }
    });
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-card-actions", props.class],
        "style": props.style
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});
const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardSubtitle");
const VCardSubtitle = genericComponent()({
  name: "VCardSubtitle",
  props: makeVCardSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-card-subtitle", props.class],
      "style": [{
        "--v-card-subtitle-opacity": props.opacity
      }, props.style]
    }, slots));
    return {};
  }
});
const VCardTitle = createSimpleFunctional("v-card-title");
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VResponsive");
const VResponsive = genericComponent()({
  name: "VResponsive",
  props: makeVResponsiveProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-responsive", {
          "v-responsive--inline": props.inline
        }, props.class],
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_a = slots.additional) == null ? void 0 : _a.call(slots), slots.default && createVNode("div", {
        "class": ["v-responsive__content", props.contentClass]
      }, [slots.default()])]);
    });
    return {};
  }
});
const makeVImgProps = propsFactory({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTransitionProps()
}, "VImg");
const VImg = genericComponent()({
  name: "VImg",
  directives: {
    intersect: Intersect
  },
  props: makeVImgProps(),
  emits: {
    loadstart: (value) => true,
    load: (value) => true,
    error: (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const vm = getCurrentInstance("VImg");
    const currentSrc = shallowRef("");
    const image = ref();
    const state = shallowRef(props.eager ? "loading" : "idle");
    const naturalWidth = shallowRef();
    const naturalHeight = shallowRef();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    function init(isIntersecting) {
      if (props.eager && isIntersecting) return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src) return;
      nextTick(() => {
        var _a;
        emit("loadstart", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
        setTimeout(() => {
          var _a2;
          if (vm.isUnmounted) return;
          if ((_a2 = image.value) == null ? void 0 : _a2.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === "error") return;
            if (!aspectRatio.value) pollForSize(image.value, null);
            if (state.value === "loading") onLoad();
          } else {
            if (!aspectRatio.value) pollForSize(image.value);
            getSrc();
          }
        });
      });
    }
    function onLoad() {
      var _a;
      if (vm.isUnmounted) return;
      getSrc();
      pollForSize(image.value);
      state.value = "loaded";
      emit("load", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
    }
    function onError() {
      var _a;
      if (vm.isUnmounted) return;
      state.value = "error";
      emit("error", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        if (vm.isUnmounted) return;
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = (void 0).setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = computed(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      var _a;
      if (!normalisedSrc.value.src || state.value === "idle") return null;
      const img = createVNode("img", {
        "class": ["v-img__img", containClasses.value],
        "style": {
          objectPosition: props.position
        },
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "crossorigin": props.crossorigin,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = (_a = slots.sources) == null ? void 0 : _a.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
        "class": ["v-img__img", "v-img__img--preload", containClasses.value],
        "style": {
          objectPosition: props.position
        },
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt,
        "crossorigin": props.crossorigin,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient) return null;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => {
      const responsiveProps = VResponsive.filterProps(props);
      return withDirectives(createVNode(VResponsive, mergeProps({
        "class": ["v-img", {
          "v-img--absolute": props.absolute,
          "v-img--booting": !isBooted.value
        }, backgroundColorClasses.value, roundedClasses.value, props.class],
        "style": [{
          width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
        }, backgroundColorStyles.value, props.style]
      }, responsiveProps, {
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? "img" : void 0
      }), {
        additional: () => createVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[resolveDirective("intersect"), {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]);
    });
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});
const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAvatar");
const VAvatar = genericComponent()({
  name: "VAvatar",
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-avatar", {
        "v-avatar--start": props.start,
        "v-avatar--end": props.end
      }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
      "style": [colorStyles.value, sizeStyles.value, props.style]
    }, {
      default: () => [!slots.default ? props.image ? createVNode(VImg, {
        "key": "image",
        "src": props.image,
        "alt": "",
        "cover": true
      }, null) : props.icon ? createVNode(VIcon, {
        "key": "icon",
        "icon": props.icon
      }, null) : props.text : createVNode(VDefaultsProvider, {
        "key": "content-defaults",
        "defaults": {
          VImg: {
            cover: true,
            src: props.image
          },
          VIcon: {
            icon: props.icon
          }
        }
      }, {
        default: () => [slots.default()]
      }), genOverlays(false, "v-avatar")]
    }));
    return {};
  }
});
const makeCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: [String, Number],
  title: [String, Number],
  ...makeComponentProps(),
  ...makeDensityProps()
}, "VCardItem");
const VCardItem = genericComponent()({
  name: "VCardItem",
  props: makeCardItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a;
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      return createVNode("div", {
        "class": ["v-card-item", props.class],
        "style": props.style
      }, [hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-card-item__prepend"
      }, [!slots.prepend ? createVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
        "key": "prepend-avatar",
        "density": props.density,
        "image": props.prependAvatar
      }, null), props.prependIcon && createVNode(VIcon, {
        "key": "prepend-icon",
        "density": props.density,
        "icon": props.prependIcon
      }, null)]) : createVNode(VDefaultsProvider, {
        "key": "prepend-defaults",
        "disabled": !hasPrependMedia,
        "defaults": {
          VAvatar: {
            density: props.density,
            image: props.prependAvatar
          },
          VIcon: {
            density: props.density,
            icon: props.prependIcon
          }
        }
      }, slots.prepend)]), createVNode("div", {
        "class": "v-card-item__content"
      }, [hasTitle && createVNode(VCardTitle, {
        "key": "title"
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [(_a3 = (_a2 = slots.title) == null ? void 0 : _a2.call(slots)) != null ? _a3 : props.title];
        }
      }), hasSubtitle && createVNode(VCardSubtitle, {
        "key": "subtitle"
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [(_a3 = (_a2 = slots.subtitle) == null ? void 0 : _a2.call(slots)) != null ? _a3 : props.subtitle];
        }
      }), (_a = slots.default) == null ? void 0 : _a.call(slots)]), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-card-item__append"
      }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
        "key": "append-icon",
        "density": props.density,
        "icon": props.appendIcon
      }, null), props.appendAvatar && createVNode(VAvatar, {
        "key": "append-avatar",
        "density": props.density,
        "image": props.appendAvatar
      }, null)]) : createVNode(VDefaultsProvider, {
        "key": "append-defaults",
        "disabled": !hasAppendMedia,
        "defaults": {
          VAvatar: {
            density: props.density,
            image: props.appendAvatar
          },
          VIcon: {
            density: props.density,
            icon: props.appendIcon
          }
        }
      }, slots.append)])]);
    });
    return {};
  }
});
const makeVCardTextProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardText");
const VCardText = genericComponent()({
  name: "VCardText",
  props: makeVCardTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-card-text", props.class],
      "style": [{
        "--v-card-text-opacity": props.opacity
      }, props.style]
    }, slots));
    return {};
  }
});
const makeVCardProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  subtitle: [String, Number],
  text: [String, Number],
  title: [String, Number],
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VCard");
const VCard = genericComponent()({
  name: "VCard",
  directives: {
    Ripple
  },
  props: makeVCardProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = !!(slots.title || props.title != null);
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text != null);
      return withDirectives(createVNode(Tag, mergeProps({
        "class": ["v-card", {
          "v-card--disabled": props.disabled,
          "v-card--flat": props.flat,
          "v-card--hover": props.hover && !(props.disabled || props.flat),
          "v-card--link": isClickable.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
        "onClick": isClickable.value && link.navigate,
        "tabindex": props.disabled ? -1 : void 0
      }, link.linkProps), {
        default: () => {
          var _a;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-card__image"
          }, [!slots.image ? createVNode(VImg, {
            "key": "image-img",
            "cover": true,
            "src": props.image
          }, null) : createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, slots.image)]), createVNode(LoaderSlot, {
            "name": "v-card",
            "active": !!props.loading,
            "color": typeof props.loading === "boolean" ? void 0 : props.loading
          }, {
            default: slots.loader
          }), hasCardItem && createVNode(VCardItem, {
            "key": "item",
            "prependAvatar": props.prependAvatar,
            "prependIcon": props.prependIcon,
            "title": props.title,
            "subtitle": props.subtitle,
            "appendAvatar": props.appendAvatar,
            "appendIcon": props.appendIcon
          }, {
            default: slots.item,
            prepend: slots.prepend,
            title: slots.title,
            subtitle: slots.subtitle,
            append: slots.append
          }), hasText && createVNode(VCardText, {
            "key": "text"
          }, {
            default: () => {
              var _a3;
              var _a2;
              return [(_a3 = (_a2 = slots.text) == null ? void 0 : _a2.call(slots)) != null ? _a3 : props.text];
            }
          }), (_a = slots.default) == null ? void 0 : _a.call(slots), slots.actions && createVNode(VCardActions, null, {
            default: slots.actions
          }), genOverlays(isClickable.value, "v-card")];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple]]);
    });
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "summary",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref({});
    const formStore = useFormStore();
    const router = useRouter();
    function handleClick() {
      router.back();
      formStore.clear();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VApp, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, { class: "flex justify-center items-center min-h-screen px-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8"${_scopeId3}><h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6"${_scopeId3}> Souhrn odeslan\xFDch \xFAdaj\u016F </h2>`);
                        _push4(ssrRenderComponent(VCard, { class: "p-4 bg-gray-100 rounded-md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, { class: "gap-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Pravideln\xE1 v\xFD\u0161e investice v CZK:</strong><div${_scopeId6}>${ssrInterpolate(data.value.investmentAmount)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Pravideln\xE1 v\xFD\u0161e investice v CZK:"),
                                            createVNode("div", null, toDisplayString(data.value.investmentAmount), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Jm\xE9no:</strong><div${_scopeId6}>${ssrInterpolate(data.value.name)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Jm\xE9no:"),
                                            createVNode("div", null, toDisplayString(data.value.name), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>P\u0159\xEDjmen\xED:</strong><div${_scopeId6}>${ssrInterpolate(data.value.surname)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "P\u0159\xEDjmen\xED:"),
                                            createVNode("div", null, toDisplayString(data.value.surname), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Datum narozen\xED:</strong><div${_scopeId6}>${ssrInterpolate(data.value.dateOfBirth)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Datum narozen\xED:"),
                                            createVNode("div", null, toDisplayString(data.value.dateOfBirth), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Telefonn\xED \u010D\xEDslo:</strong><div${_scopeId6}>${ssrInterpolate(data.value.telephone)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Telefonn\xED \u010D\xEDslo:"),
                                            createVNode("div", null, toDisplayString(data.value.telephone), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Emailov\xE1 adresa:</strong><div${_scopeId6}>${ssrInterpolate(data.value.email)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Emailov\xE1 adresa:"),
                                            createVNode("div", null, toDisplayString(data.value.email), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Rodn\xE9 \u010D\xEDslo:</strong><div${_scopeId6}>${ssrInterpolate(data.value.socialSecurityNumber)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Rodn\xE9 \u010D\xEDslo:"),
                                            createVNode("div", null, toDisplayString(data.value.socialSecurityNumber), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:</strong><div${_scopeId6}>${ssrInterpolate(data.value.identityCardNumber)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:"),
                                            createVNode("div", null, toDisplayString(data.value.identityCardNumber), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "12" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Adresa trval\xE9ho pobytu:</strong><div${_scopeId6}>${ssrInterpolate(data.value.address)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Adresa trval\xE9ho pobytu:"),
                                            createVNode("div", null, toDisplayString(data.value.address), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:</strong><div${_scopeId6}>${ssrInterpolate(data.value.bankAccountNumber)}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:"),
                                            createVNode("div", null, toDisplayString(data.value.bankAccountNumber), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "12" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<strong${_scopeId6}>Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:</strong><div${_scopeId6}>${ssrInterpolate(data.value.consent ? "Ano" : "Ne")}</div>`);
                                        } else {
                                          return [
                                            createVNode("strong", null, "Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:"),
                                            createVNode("div", null, toDisplayString(data.value.consent ? "Ano" : "Ne"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Pravideln\xE1 v\xFD\u0161e investice v CZK:"),
                                          createVNode("div", null, toDisplayString(data.value.investmentAmount), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Jm\xE9no:"),
                                          createVNode("div", null, toDisplayString(data.value.name), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "P\u0159\xEDjmen\xED:"),
                                          createVNode("div", null, toDisplayString(data.value.surname), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Datum narozen\xED:"),
                                          createVNode("div", null, toDisplayString(data.value.dateOfBirth), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Telefonn\xED \u010D\xEDslo:"),
                                          createVNode("div", null, toDisplayString(data.value.telephone), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Emailov\xE1 adresa:"),
                                          createVNode("div", null, toDisplayString(data.value.email), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Rodn\xE9 \u010D\xEDslo:"),
                                          createVNode("div", null, toDisplayString(data.value.socialSecurityNumber), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:"),
                                          createVNode("div", null, toDisplayString(data.value.identityCardNumber), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Adresa trval\xE9ho pobytu:"),
                                          createVNode("div", null, toDisplayString(data.value.address), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:"),
                                          createVNode("div", null, toDisplayString(data.value.bankAccountNumber), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode("strong", null, "Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:"),
                                          createVNode("div", null, toDisplayString(data.value.consent ? "Ano" : "Ne"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="flex justify-center items-center mb-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(VBtn, {
                                onClick: handleClick,
                                color: "primary",
                                class: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` OK, jdeme na hl\xE1vn\xED str\xE1nku `);
                                  } else {
                                    return [
                                      createTextVNode(" OK, jdeme na hl\xE1vn\xED str\xE1nku ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode(VRow, { class: "gap-4" }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Pravideln\xE1 v\xFD\u0161e investice v CZK:"),
                                        createVNode("div", null, toDisplayString(data.value.investmentAmount), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Jm\xE9no:"),
                                        createVNode("div", null, toDisplayString(data.value.name), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "P\u0159\xEDjmen\xED:"),
                                        createVNode("div", null, toDisplayString(data.value.surname), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Datum narozen\xED:"),
                                        createVNode("div", null, toDisplayString(data.value.dateOfBirth), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Telefonn\xED \u010D\xEDslo:"),
                                        createVNode("div", null, toDisplayString(data.value.telephone), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Emailov\xE1 adresa:"),
                                        createVNode("div", null, toDisplayString(data.value.email), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Rodn\xE9 \u010D\xEDslo:"),
                                        createVNode("div", null, toDisplayString(data.value.socialSecurityNumber), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:"),
                                        createVNode("div", null, toDisplayString(data.value.identityCardNumber), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Adresa trval\xE9ho pobytu:"),
                                        createVNode("div", null, toDisplayString(data.value.address), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:"),
                                        createVNode("div", null, toDisplayString(data.value.bankAccountNumber), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:"),
                                        createVNode("div", null, toDisplayString(data.value.consent ? "Ano" : "Ne"), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex justify-center items-center mb-4" }, [
                                  createVNode(VBtn, {
                                    onClick: handleClick,
                                    color: "primary",
                                    class: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" OK, jdeme na hl\xE1vn\xED str\xE1nku ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8" }, [
                            createVNode("h2", { class: "text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6" }, " Souhrn odeslan\xFDch \xFAdaj\u016F "),
                            createVNode(VCard, { class: "p-4 bg-gray-100 rounded-md" }, {
                              default: withCtx(() => [
                                createVNode(VRow, { class: "gap-4" }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Pravideln\xE1 v\xFD\u0161e investice v CZK:"),
                                        createVNode("div", null, toDisplayString(data.value.investmentAmount), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Jm\xE9no:"),
                                        createVNode("div", null, toDisplayString(data.value.name), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "P\u0159\xEDjmen\xED:"),
                                        createVNode("div", null, toDisplayString(data.value.surname), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Datum narozen\xED:"),
                                        createVNode("div", null, toDisplayString(data.value.dateOfBirth), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Telefonn\xED \u010D\xEDslo:"),
                                        createVNode("div", null, toDisplayString(data.value.telephone), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Emailov\xE1 adresa:"),
                                        createVNode("div", null, toDisplayString(data.value.email), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Rodn\xE9 \u010D\xEDslo:"),
                                        createVNode("div", null, toDisplayString(data.value.socialSecurityNumber), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:"),
                                        createVNode("div", null, toDisplayString(data.value.identityCardNumber), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Adresa trval\xE9ho pobytu:"),
                                        createVNode("div", null, toDisplayString(data.value.address), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:"),
                                        createVNode("div", null, toDisplayString(data.value.bankAccountNumber), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("strong", null, "Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:"),
                                        createVNode("div", null, toDisplayString(data.value.consent ? "Ano" : "Ne"), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex justify-center items-center mb-4" }, [
                                  createVNode(VBtn, {
                                    onClick: handleClick,
                                    color: "primary",
                                    class: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" OK, jdeme na hl\xE1vn\xED str\xE1nku ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, { class: "flex justify-center items-center min-h-screen px-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8" }, [
                          createVNode("h2", { class: "text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6" }, " Souhrn odeslan\xFDch \xFAdaj\u016F "),
                          createVNode(VCard, { class: "p-4 bg-gray-100 rounded-md" }, {
                            default: withCtx(() => [
                              createVNode(VRow, { class: "gap-4" }, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Pravideln\xE1 v\xFD\u0161e investice v CZK:"),
                                      createVNode("div", null, toDisplayString(data.value.investmentAmount), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Jm\xE9no:"),
                                      createVNode("div", null, toDisplayString(data.value.name), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "P\u0159\xEDjmen\xED:"),
                                      createVNode("div", null, toDisplayString(data.value.surname), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Datum narozen\xED:"),
                                      createVNode("div", null, toDisplayString(data.value.dateOfBirth), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Telefonn\xED \u010D\xEDslo:"),
                                      createVNode("div", null, toDisplayString(data.value.telephone), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Emailov\xE1 adresa:"),
                                      createVNode("div", null, toDisplayString(data.value.email), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Rodn\xE9 \u010D\xEDslo:"),
                                      createVNode("div", null, toDisplayString(data.value.socialSecurityNumber), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:"),
                                      createVNode("div", null, toDisplayString(data.value.identityCardNumber), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Adresa trval\xE9ho pobytu:"),
                                      createVNode("div", null, toDisplayString(data.value.address), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:"),
                                      createVNode("div", null, toDisplayString(data.value.bankAccountNumber), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode("strong", null, "Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:"),
                                      createVNode("div", null, toDisplayString(data.value.consent ? "Ano" : "Ne"), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex justify-center items-center mb-4" }, [
                                createVNode(VBtn, {
                                  onClick: handleClick,
                                  color: "primary",
                                  class: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" OK, jdeme na hl\xE1vn\xED str\xE1nku ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VApp, null, {
                default: withCtx(() => [
                  createVNode(VContainer, { class: "flex justify-center items-center min-h-screen px-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8" }, [
                        createVNode("h2", { class: "text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6" }, " Souhrn odeslan\xFDch \xFAdaj\u016F "),
                        createVNode(VCard, { class: "p-4 bg-gray-100 rounded-md" }, {
                          default: withCtx(() => [
                            createVNode(VRow, { class: "gap-4" }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Pravideln\xE1 v\xFD\u0161e investice v CZK:"),
                                    createVNode("div", null, toDisplayString(data.value.investmentAmount), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Jm\xE9no:"),
                                    createVNode("div", null, toDisplayString(data.value.name), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "P\u0159\xEDjmen\xED:"),
                                    createVNode("div", null, toDisplayString(data.value.surname), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Datum narozen\xED:"),
                                    createVNode("div", null, toDisplayString(data.value.dateOfBirth), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Telefonn\xED \u010D\xEDslo:"),
                                    createVNode("div", null, toDisplayString(data.value.telephone), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Emailov\xE1 adresa:"),
                                    createVNode("div", null, toDisplayString(data.value.email), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Rodn\xE9 \u010D\xEDslo:"),
                                    createVNode("div", null, toDisplayString(data.value.socialSecurityNumber), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "\u010C\xEDslo ob\u010Dansk\xE9ho pr\u016Fkazu:"),
                                    createVNode("div", null, toDisplayString(data.value.identityCardNumber), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Adresa trval\xE9ho pobytu:"),
                                    createVNode("div", null, toDisplayString(data.value.address), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "\u010C\xEDslo bankovn\xEDho \xFA\u010Dtu:"),
                                    createVNode("div", null, toDisplayString(data.value.bankAccountNumber), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode("strong", null, "Souhlas se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F:"),
                                    createVNode("div", null, toDisplayString(data.value.consent ? "Ano" : "Ne"), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex justify-center items-center mb-4" }, [
                              createVNode(VBtn, {
                                onClick: handleClick,
                                color: "primary",
                                class: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" OK, jdeme na hl\xE1vn\xED str\xE1nku ")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/summary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=summary-C4OuNJpu.mjs.map
