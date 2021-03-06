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
import FooterNav from './component/FooterNav.vue';
import Simulator from './component/Simulator.vue';
import SearchInput from './component/SearchInput.vue';
import progress from 'nprogress';

import './style/index.less';

const components = [
  Nav,
  Header,
  Footer,
  FooterNav,
  HDoc,
  Content,
  Block,
  DemoBlock,
  DemoSection,
  Container,
  Simulator,
  SearchInput
];

export default function install() {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

export {
  Nav,
  Header,
  Footer,
  FooterNav,
  HDoc,
  Content,
  Block,
  DemoBlock,
  DemoSection,
  Container,
  Simulator,
  SearchInput,
  progress
};