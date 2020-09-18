<template>
  <ValidationObserver v-slot="{ invalid }">
    <v-card-text>
      <v-form>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('posts.userId')"
          rules="required|numeric"
        >
          <v-text-field
            v-model="post.userId"
            :label="$t('posts.userId')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('posts.title')"
          rules="required|regex:^[a-zA-Z0-9\s]*$"
        >
          <v-text-field
            v-model="post.title"
            :label="$t('posts.title')"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('posts.body')"
          rules="required|regex:^[a-zA-Z0-9\s]*$"
        >
          <v-textarea
            v-model="post.body"
            :label="$t('posts.body')"
            :error-messages="errors"
          ></v-textarea>
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
    post: {
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
