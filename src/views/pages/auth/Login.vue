<template>
  <div>
    <!--begin::Body-->
    <div class="kt-login__body">
      <!--begin::Signin-->
      <div class="kt-login__form">
        <div class="kt-login__title">
          <h3>{{$t('login')}}</h3>
        </div>

        <!--begin::Form-->
        <b-form class="kt-form" @submit.stop.prevent="onSubmit">
          
          <div
            role="alert"
            v-bind:class="{ show: errors.length }"
            class="alert fade alert-danger"
          >
            <div class="alert-text">
              {{ errors }}
            </div>
          </div>

          <b-form-group
            id="example-input-group-1"
            label=""
            label-for="example-input-1"
          >
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              v-model="$v.form.email.$model"
              :state="validateState('email')"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback">
              {{$t('email_required')}}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="example-input-group-2"
            label=""
            label-for="example-input-2"
          >
            <b-form-input
              type="password"
              id="example-input-2"
              name="example-input-2"
              v-model="$v.form.password.$model"
              :state="validateState('password')"
              aria-describedby="input-2-live-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="input-2-live-feedback">
              {{$t('password_required')}}
            </b-form-invalid-feedback>
          </b-form-group>

          <!--begin::Action-->
          <div class="kt-login__actions">
            <b-button
              type="submit"
              id="kt_submit"
              class="btn btn-primary btn-elevate kt-login__btn-primary"
            >
              {{ $t("AUTH.LOGIN.BUTTON") }}
            </b-button>
          </div>
          <!--end::Action-->
        </b-form>
        <!--end::Form-->
      </div>
      <!--end::Signin-->
    </div>
    <!--end::Body-->
  </div>
</template>

<style lang="scss" scoped>
.kt-spinner.kt-spinner--right:before {
  right: 8px;
}
</style>

<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/store/auth.module";

import { validationMixin } from "vuelidate";
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "login",
  data() {
    return {
      // Remove this dummy login info
      form: {
        email: "dental@elnozom.com",
        password: "123456",
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        email: null,
        password: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const email = this.$v.form.email.$model;
      const password = this.$v.form.password.$model;

      // clear existing errors
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = document.getElementById("kt_submit");
      submitButton.classList.add(
        "kt-spinner",
        "kt-spinner--light",
        "kt-spinner--right"
      );

      // dummy delay
      setTimeout(() => {
        // send login request
        this.$store
          .dispatch(LOGIN, { email, password })
          // go to which page after successfully login
          .then(() => this.$router.push({ name: "dashboard" }))
          .catch((e) => this.errors.push(e));

        submitButton.classList.remove(
          "kt-spinner",
          "kt-spinner--light",
          "kt-spinner--right"
        );
      }, 2000);
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
    backgroundImage() {
      return process.env.BASE_URL + "assets/media/bg/bg-4.jpg";
    },
  },
};
</script>
