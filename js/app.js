Vue.use(VueSmoothScroll);

const app = new Vue({
  el: "#app",
  data() {
    return {
      showHeader: true,
      headerColoured: false,
      lastScrollPosition: 0,
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.toggleHeader);
    window.addEventListener("scroll", this.changeHeaderColor);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.toggleHeader);
    window.removeEventListener("scroll", this.changeHeaderColor);
  },
  methods: {
    toggleHeader() {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 0) {
        return;
      }
      this.showHeader = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },

    changeHeaderColor() {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition < 150) {
        this.headerColoured = false;
      } else {
        this.headerColoured = true;
      }
    },

    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
    }
  },

  computed: {
    checkForm() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.email.length > 0
      );
    }
  }
});

// Initializing scroll animation library
AOS.init();
