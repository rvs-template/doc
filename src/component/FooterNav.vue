<template>
  <div class="h-doc-footer-nav">
    <div v-if="leftNav" @click="handleNavClick('prev')">
      <div class="h-doc-footer-nav__arrow-left" />
      <span>{{ leftNav.title }}</span>
    </div>
    <div v-if="rightNav" @click="handleNavClick('next')">
      <span>{{ rightNav.title }}</span>
      <div class="h-doc-footer-nav__arrow-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'h-doc-footer-nav',
  props: {
    base: String,
    navConfig: Array
  },
  data() {
    return {
      nav: [],
      leftNav: null,
      rightNav: null
    }
  },
  created() {
    this.setNav();
    this.updateNav();
    this.keyBoardHandler();
    console.log(this.nav, this.leftNav, this.rightNav);
  },
  methods: {
    setNav() {
      const nav = this.navConfig;
      for (let i = 0 ; i < nav.length; i++) {
        const navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (let j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },
    updateNav() {
      let currentIndex;
      this.currentPath = '/' + this.$route.path.split('/').pop();
      let len = this.nav.length;
      for (let i = 0; i < len; i++) {
        if (this.nav.path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },
    handleNavClick(direction) {
      const nav = direction === 'prev' ? this.leftNav : this.rightNav;
      if (nav.path) {
        this.$router.push(this.base + nav.path);
      } else if (nav.link) {
        window.location.href = nav.link;
      }
    },
    keyBoardHandler() {
      window.addEventListener('keyup', (event) => {
        switch(event.code) {
          case 37:
            this.handleNavClick('prev');
            break;
          case 38:
            this.handleNavClick('next');
            break;
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
