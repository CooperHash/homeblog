import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Markdown from '@/components/Markdown.vue'

describe('Markdown.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Markdown, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
