import { mount } from '@vue/test-utils';
import ContentDisplay from './ContentDisplay.vue';
import { describe, it, expect } from 'vitest';

describe('ContentDisplay.vue', () => {
  const textConfig = {
    type: 'text',
    text: 'Sample text content',
    id: 1,
    pendingConfiguration: false
  };

  const imageConfig = {
    type: 'image',
    src: 'https://via.placeholder.com/150',
    alt: 'Sample image',
    id: 2,
    pendingConfiguration: false
  };

  it('renders text content when config type is text', () => {
    const wrapper = mount(ContentDisplay, {
      props: { config: textConfig }
    });
    expect(wrapper.find('p').text()).toBe(textConfig.text);
  });

  it('renders image content when config type is image', () => {
    const wrapper = mount(ContentDisplay, {
      props: { config: imageConfig }
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(imageConfig.src);
    expect(img.attributes('alt')).toBe(imageConfig.alt);
  });

  it('emits remove event with correct id when remove button is clicked', async () => {
    const wrapper = mount(ContentDisplay, {
      props: { config: textConfig }
    });
    await wrapper.find('.fa-trash').trigger('click');
    expect(wrapper.emitted().remove[0]).toEqual([textConfig.id]);
  });

  it('emits edit event with correct id when edit button is clicked', async () => {
    const wrapper = mount(ContentDisplay, {
      props: { config: textConfig }
    });
    await wrapper.find('.fa-pen').trigger('click');
    expect(wrapper.emitted().edit[0]).toEqual([textConfig.id]);
  });
});