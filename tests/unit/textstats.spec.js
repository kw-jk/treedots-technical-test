import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import TextStats from '@/components/TextStats.vue'
import Result from "@/components/Result.vue"

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('TextStats.vue', () => {
  let vuetify, wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(TextStats, {
      localVue,
      vuetify,
    })
  })

  afterEach(() => {
      wrapper.destroy();
  });

  it('should not render result component if no data is being analysed', () => {
    expect(wrapper.find(Result).exists()).toBe(false)
  })

  describe('User populate the input fields and submit', () => {
    it('should render result component if data is being analysed', () => {
      wrapper.setData({ sentence: 'its cool and awesome' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find(Result).exists()).toBe(true)
    })
    
    it('should not render result if form submitted with sentence more than 255 characters', () => {
      wrapper.setData({ sentence: 'its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find(Result).exists()).toBe(false)
    })

    it('should rendered error if form submitted with empty field', () => {
      wrapper.setData({ sentence: '' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
    })

    it('should rendered error if sentence submitted with more than 255 characters', () => {
      wrapper.setData({ sentence: 'its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome its cool and awesome' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
    })

    it('should not render error if sentence submitted has less than 255 characters', () => {
      wrapper.setData({ sentence: 'its cool and awesome' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeFalsy()
    })
  })
})
