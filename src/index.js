import Vue from 'vue';
import HDoc from './H-Doc.vue';
import Block from './component/Block.vue';
import Content from './component/Content.vue';
import DemoBlock from './component/DemoBlock.vue';
import DemoSection from './component/DemoSection.vue';

import progress from 'nprogress';
import './style/index.less';

const components = [
  Nav,
  Header,
  Footer,
  HDoc,
  Content,
  DemoBlock,
  DemoSection
];

export default function install() {
  components.forEach((component) => {
    Vue.component(component.name, component);
  })
}

export {
  Nav,
  Header,
  Footer,
  HDoc,
  Content,
  DemoBlock,
  DemoSection
};