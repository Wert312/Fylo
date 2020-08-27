Vue.use(VueSmoothScroll);
Vue.use(vuelidate.default);

const app = new Vue({
  el: "#app",
  data() {
    return {
      header: {
        showHeader: true,
        headerColoured: false,
        lastScrollPosition: 0
      },

      form: {
        firstName: null,
        lastName: null,
        email: null,
        isFormSent: false
      }
    };
  },

  validations: {
    form: {
      firstName: {
        required: validators.required,
        alpha: validators.alpha
      },
      lastName: {
        required: validators.required,
        alpha: validators.alpha
      },
      email: {
        required: validators.required,
        email: validators.email
      }
    }
  },

  mounted() {
    window.addEventListener("scroll", this.toggleHeader);
    window.addEventListener("scroll", this.changeHeaderColor);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.toggleHeader);
    window.removeEventListener("scroll", this.changeHeaderColor);
  },

  computed: {
    fullName() {
      return `${
        this.form.firstName.charAt(0).toUpperCase() +
        this.form.firstName.slice(1)
      } ${
        this.form.lastName.charAt(0).toUpperCase() + this.form.lastName.slice(1)
      }`;
    }
  },

  methods: {
    toggleHeader() {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition < 0) {
        return;
      }
      if (
        Math.abs(currentScrollPosition - this.header.lastScrollPosition) < 0
      ) {
        return;
      }
      this.header.showHeader =
        currentScrollPosition < this.header.lastScrollPosition;
      this.header.lastScrollPosition = currentScrollPosition;
    },

    changeHeaderColor() {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition < 150) {
        this.header.headerColoured = false;
      } else {
        this.header.headerColoured = true;
      }
    },

    submitForm() {
      this.form.isFormSent = true;
    },

    refreshForm() {
      this.form.isFormSent = false;

      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;

      this.$v.$reset();
    }
  }
});

// Initializing scroll animation library
AOS.init();
