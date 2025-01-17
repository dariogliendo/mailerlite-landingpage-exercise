import { describe, it, expect } from 'vitest';
import ContentConfig from './ContentConfig.vue';
import { mount } from '@vue/test-utils';

describe('ContentConfig Component', () => {
	describe('ContentConfig Component', () => {
		it('renders TextConfig when config type is text', () => {
			const wrapper = mount(ContentConfig, {
				props: {
					config: {
						type: 'text',
						text: 'Sample text',
						id: 1,
						pendingConfiguration: false
					}
				}
			});
			expect(wrapper.findComponent({ name: 'TextConfig' }).exists()).toBe(true);
			expect(wrapper.findComponent({ name: 'ImageConfig' }).exists()).toBe(false);
		});

		it('renders ImageConfig when config type is image', () => {
			const wrapper = mount(ContentConfig, {
				props: {
					config: {
						type: 'image',
						src: 'sample-image.jpg',
						id: 2,
						pendingConfiguration: false,
					}
				}
			});
			expect(wrapper.findComponent({ name: 'ImageConfig' }).exists()).toBe(true);
			expect(wrapper.findComponent({ name: 'TextConfig' }).exists()).toBe(false);
		});

		it('emits update:config event with updated text when updateTextConfig is called', async () => {
			const wrapper = mount(ContentConfig, {
				props: {
					config: {
						type: 'text',
						text: 'Sample text',
						id: 1,
						pendingConfiguration: true
					}
				}
			});
			await wrapper.findComponent({ name: 'TextConfig' }).vm.$emit('update:text', 'Updated text');
			expect(wrapper.emitted('update:config')?.[0]).toEqual([{ type: 'text', text: 'Updated text', id: 1, pendingConfiguration: false }]);
		});

		it('emits update:config event with updated src when updateImageConfig is called', async () => {
			const wrapper = mount(ContentConfig, {
				props: {
					config: {
						type: 'image',
						src: 'sample-image.jpg',
						id: 2,
						pendingConfiguration: false
					}
				}
			});
			await wrapper.findComponent({ name: 'ImageConfig' }).vm.$emit('update:image', 'updated-image.jpg');
			expect(wrapper.emitted('update:config')?.[0]).toEqual([{ type: 'image', src: 'updated-image.jpg', id: 2, pendingConfiguration: false }]);
		});

		it('emits cancel event when cancel is called', async () => {
			const wrapper = mount(ContentConfig, {
				props: {
					config: {
						type: 'text',
						text: 'Sample text',
						id: 1,
						pendingConfiguration: true
					}
				}
			});
			await wrapper.findComponent({ name: 'TextConfig' }).vm.$emit('cancel');
			expect(wrapper.emitted('cancel')?.[0]).toBeTruthy()
		});
	});
});