<template>
  <ValidationObserver v-slot="{ invalid }">
    <v-card-text>
      <v-form>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('users.name')"
          rules="required|regex:^[a-zA-Z0-9\s]*$"
        >
          <v-text-field
            v-model="user.name"
            :label="$t('users.name')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('users.username')"
          rules="required|regex:^[a-zA-Z0-9]*$"
        >
          <v-text-field
            v-model="user.username"
            :label="$t('users.username')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('users.email')"
          rules="required|email"
        >
          <v-text-field
            v-model="user.email"
            :label="$t('users.email')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('users.phone')"
          rules="required|regex:^[0-9\-\(\)\sx]*$"
        >
          <v-text-field
            v-model="user.phone"
            :label="$t('users.phone')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('users.website')"
          rules="required|regex:^[\/\:a-zA-Z0-9\-\_\~\.]+$"
        >
          <v-text-field
            v-model="user.website"
            :label="$t('users.website')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="invalid" @click="save()">{{
        $t('common.save')
      }}</v-btn>
    </v-card-actions>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    save() {
      this.$emit('save')
    },
  },
}
</script>
