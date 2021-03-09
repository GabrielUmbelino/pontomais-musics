<template>
  <nav class="pagination is-small">
    <button
      class="button pagination-previous"
      :disabled="isFirst"
      @click="onChangePage(current - 1)"
    >
      Anterior
    </button>
    <button
      class="button pagination-next"
      :disabled="isLast"
      @click="onChangePage(current + 1)"
    >
      Proximo
    </button>
    <ul class="pagination-list">
      <li v-for="page in pages" :key="page">
        <button
          :disabled="isCurrent(page)"
          class="button pagination-link"
          :class="{ 'is-current': isCurrent(page) }"
          @click="onChangePage(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      current: Number,
      length: Number,
    },
    computed: {
      pages(): number[] {
        if (!this.length || !this.current) {
          return []
        }
        const pages = [this.current]
        const max = Math.ceil(this.length / 10)
        if (this.current - 2 > 0) {
          pages.push(this.current - 2)
        }

        if (this.current - 1 > 0) {
          pages.push(this.current - 1)
        }
        if (this.current + 1 <= max) {
          pages.push(this.current + 1)
        }

        if (this.current + 2 <= max) {
          pages.push(this.current + 2)
        }

        return pages.sort()
      },
      isFirst(): boolean {
        return this.current === 1
      },
      isLast(): boolean {
        if (!this.length) {
          return false
        }

        return Math.ceil(this.length / 10) === this.current
      },
    },
    methods: {
      onChangePage(page: number) {
        if (this.isCurrent(page)) {
          return
        }

        this.$emit('onChange', page)
      },
      isCurrent(page: number) {
        return this.current === page
      },
    },
  })
</script>
<style lang="scss">
  .pagination {
    .pagination-list {
      .pagination-link.is-current {
        background-color: $primary;
        border-color: $primary;
      }
    }
  }
  @media (max-width: 768px) {
    .pagination {
      .pagination-list {
        display: none;
      }
    }
  }
</style>
