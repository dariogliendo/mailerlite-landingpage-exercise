import { mount } from '@vue/test-utils';
import TextConfig from './TextConfig.vue';
import { describe, it, expect } from 'vitest';

describe('TextConfig.vue', () => {
  it('renders textarea with initial text', () => {
    const wrapper = mount(TextConfig, {
      props: { text: 'Initial text' }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.value).toBe('Initial text');
  });

  it('emits update:text event with new value on check icon click', async () => {
    const wrapper = mount(TextConfig, {
      props: { text: 'Initial text' }
    });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('Updated text');
    const checkIcon = wrapper.find('.fa-check-circle');
    await checkIcon.trigger('click');
    expect(wrapper.emitted('update:text')).toBeTruthy();
    expect(wrapper.emitted('update:text')![0]).toEqual(['Updated text']);
  });

  it('emits cancel event on cancel icon click', async () => {
    const wrapper = mount(TextConfig);
    const cancelIcon = wrapper.find('.fa-ban');
    await cancelIcon.trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('emits cancel event on focusout if textarea is empty', async () => {
    const wrapper = mount(TextConfig, {
      props: { text: 'Initial text' }
    });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('');
    await textarea.trigger('focusout');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('does not emit cancel event on focusout if textarea is not empty', async () => {
    const wrapper = mount(TextConfig, {
      props: { text: 'Initial text' }
    });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('Some text');
    await textarea.trigger('focusout');
    expect(wrapper.emitted('cancel')).toBeFalsy();
  });
});