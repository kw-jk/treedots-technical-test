import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import FindPosDigit from '@/components/FindPosDigit.vue'
import Result from "@/components/Result.vue"

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('FindPosDigit.vue', () => {
  let vuetify, wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(FindPosDigit, {
      localVue,
      vuetify,
    })
  })

  afterEach(() => {
      wrapper.destroy();
  });

  it('should not render result component if no data is being submitted', () => {
    expect(wrapper.find(Result).exists()).toBe(false)
  })

  describe('User populate the input fields and submit', () => {
    it('should render result component if form is submitted with no error', () => {
      wrapper.setData({ digit: '0123456789', position: '2' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find(Result).exists()).toBe(true)
      expect(wrapper.find('.error').exists()).toBeFalsy()
    })
  
    it('should not render result component if form is submitted with error', () => {
      wrapper.setData({ digit: '' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find(Result).exists()).toBe(false)
      expect(wrapper.find('.error').exists()).toBeTruthy()
    })

    it('should rendered error if form submitted with more than 255 characters with correct error message', () => {
      var x = "0123456789";
        var iterations = 5;
        for (var i = 0; i < iterations; i++) {
          x += x;
        }
      const digit = x
      wrapper.setData({ digit: digit, position: '2' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please enter no more than 255 characters!')
    })
  
    it('should rendered error if form submitted with any empty field with correct error message', () => {
      wrapper.setData({ digit: '', position: '2' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please ensure that both fields are filled up!')
  
      wrapper.setData({ digit: '0123456789', position: '' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please ensure that both fields are filled up!')
  
      wrapper.setData({ digit: '', position: '' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please ensure that both fields are filled up!')
    })
  
    it('should rendered error if either or both digit and position fields is submitted with non numeric characters with correct error message', () => {
      wrapper.setData({ digit: '123ab', position: '2' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please enter only numbers!')
  
      wrapper.setData({ digit: '0123456789', position: '123ab' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please enter only numbers!')
  
      wrapper.setData({ digit: '0123456789a', position: '123ab' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.error').exists()).toBeTruthy()
      expect(wrapper.find('.v-alert__content').text()).toBe('Please enter only numbers!')
    })

    it('should return result of the number of the input position in the digits correctly if position is valid', () => {
      wrapper.setData({ digit: '0123456789', position: '2' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.checkresult').text()).toBe('The number at position 2 is 2')
    })

    it('should return a message that the position is invalid if position exceeded the total length of the digit that is input', () => {
      wrapper.setData({ digit: '0123456789', position: '10' })
      wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick()
      expect(wrapper.find('.checkresult').text()).toBe('You have entered a position that exceeded the total length of the digit input.')
    })
  })
})
