import Vue from 'vue';
import HDoc from './H-Doc.vue';
import Block from './component/Block.vue';
import Content from './component/Content.vue';
import Container from './component/Container.vue';
import DemoBlock from './component/DemoBlock.vue';
import DemoSection from './component/DemoSection.vue';
import Nav from './component/Nav.vue';
import Header from './component/Header.vue';
import Footer from './component/Footer.vue';
import Simulator from './component/Simulator.vue';
import progress from 'nprogress';

import './style/index.less';

const components = [
  Nav,
  Header,
  Footer,
  HDoc,
  Content,
  DemoBlock,
  DemoSection,
  Container,
  Simulator
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
  DemoSection,
  Container,
  Simulator,
  progress
};