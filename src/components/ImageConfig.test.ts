import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ImageConfig from './ImageConfig.vue';

describe('ImageConfig.vue', () => {
  it('renders correctly with given options', () => {
    const wrapper = mount(ImageConfig, {
      props: {
        url: '',
      },
    });
    expect(wrapper.findAll('img').length).toBe(4);
  });

  it('selects an image when clicked', async () => {
    const wrapper = mount(ImageConfig, {
      props: {
        url: '',
      },
    });
    const images = wrapper.findAll('img');
    await images[1].trigger('click');
    expect(wrapper.emitted()['update:image'][0]).toEqual(['https://fakeimg.pl/300x200?text=Image+2']);
  });

  it('highlights the selected image', async () => {
    const wrapper = mount(ImageConfig, {
      props: {
        url: 'https://fakeimg.pl/300x200?text=Image+3',
      },
    });
    const selectedImage = wrapper.find('.border-blue-500');
    expect(selectedImage.exists()).toBe(true);
    expect(selectedImage.attributes('src')).toBe('https://fakeimg.pl/300x200?text=Image+3');
  });

  it('emits update:image event with correct payload', async () => {
    const wrapper = mount(ImageConfig, {
      props: {
        url: '',
      },
    });
    const images = wrapper.findAll('img');
    await images[2].trigger('click');
    expect(wrapper.emitted()['update:image'][0]).toEqual(['https://fakeimg.pl/300x200?text=Image+3']);
  });

  it('renders with the initial selected image', () => {
    const wrapper = mount(ImageConfig, {
      props: {
        url: 'https://fakeimg.pl/300x200?text=Image+1',
      },
    });
    const selectedImage = wrapper.find('.border-blue-500');
    expect(selectedImage.exists()).toBe(true);
    expect(selectedImage.attributes('src')).toBe('https://fakeimg.pl/300x200?text=Image+1');
  });
});